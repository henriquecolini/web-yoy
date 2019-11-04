import Painter from "../painter/painter";
import DrawableHex from "../painter/drawableHex";
import World, { EMPTY_COLOUR, HexXY, Team, Zone } from "./world";
import DrawableWorld from "../painter/drawableWorld";
import LEVELS from "../resources/levels";
import Pieces from "../resources/pieces";

export const HEX_WIDTH = 5;

export default class Game {

	private painter: Painter;
	private world: World;
	private drawableWorld: DrawableWorld;

	private fpsCounter: HTMLElement;
	private keys = {w: false, a: false, s: false, d: false};	

	private mouse = {x: 0, y: 0};		
	private pan = {x: 0, y: 0, cx: 0, cy: 0};
	private camSpeed = 40;
	private _panning = false;

	private currentTeamIndex = -1;
	private currentTeam: Team = undefined;
	private selectedZone: Zone = undefined;
	private teamIndicator: HTMLElement;
	private moneyWrapper: HTMLElement;
	private moneyDisplay: HTMLElement;
	private profitDisplay: HTMLElement;

	constructor() {

		this.painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);
		this.world = new World(LEVELS.medium[0]);
		this.drawableWorld = new DrawableWorld(this.painter, this.world, this.handleTileClick);

		let camPos = this.drawableWorld.midpoint;
		this.painter.camera.x = camPos.x;
		this.painter.camera.y = camPos.y;
				
		this.painter.add(this.drawableWorld);
		this.painter.onEmptyClick = this.handleEmptyClick;
		this.world.addChangeListener(this.drawableWorld.updateHexes);

		this.fpsCounter = document.getElementById("fps");		
		this.teamIndicator = document.getElementById("team_indicator");
		this.moneyWrapper = document.getElementById("money_wrapper");
		this.moneyDisplay = document.getElementById("money");
		this.profitDisplay = document.getElementById("profit");

		this.nextTurn(true);

		document.getElementById("next_turn").addEventListener("click", ()=>{this.nextTurn()});

		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
		document.addEventListener("wheel", this.handleWheel);
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mousedown', this.handleMouseDown);
		document.addEventListener('mouseup', this.handleMouseUp);
		document.addEventListener('mouseenter', this.handleMouseMove);

		let last: number = undefined;

		const frame = (timeStamp: DOMHighResTimeStamp) => {
			let curr = timeStamp;
			this.update(last ? (curr-last)/1000 : 1/60);
			last = curr;
			window.requestAnimationFrame(frame);
		}
	
		window.requestAnimationFrame(frame);

	}

	private update = (deltaTime: number) => {

		let camMove = {x: 0, y: 0};

		camMove.x += this.keys.a ? -1 : 0;
		camMove.x += this.keys.d ? 1 : 0;
		camMove.y += this.keys.w ? -1 : 0;
		camMove.y += this.keys.s ? 1 : 0;

		if (camMove.x != 0 && camMove.y != 0) {
			camMove.y /= Math.SQRT2;
			camMove.x /= Math.SQRT2;
		}

		this.painter.camera.x += (camMove.x*this.camSpeed) * deltaTime;
		this.painter.camera.y += (camMove.y*this.camSpeed) * deltaTime;

		this.fpsCounter.innerHTML = Math.ceil(1/deltaTime) + " fps";

	}

	private nextTurn = (firstTime = false) => {
		this.drawableWorld.highlightedZone = undefined;
		this.moneyWrapper.className = "hidden";
		this.currentTeamIndex++;
		this.currentTeamIndex %= this.world.teams.length;
		if (!firstTime && this.currentTeamIndex === 0) this.onNextRound();
		this.currentTeam = this.world.teams[this.currentTeamIndex];
		this.teamIndicator.style.background = this.currentTeam.color;
	}

	private onNextRound = () => {
		for (let i = 0; i < this.world.capitals.length; i++) {
			const capital = this.world.capitals[i];
			capital.money += World.profit(this.world.findConnected(capital.x,capital.y));
		}
		let forestData = Pieces.values("forest");
		
		let placedForests = [] as {x: number, y: number}[];
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex && (hex.piece === "forest")) {
					if (Math.random() <= forestData.spread) {
						let neis = this.world.neighbours(x,y);
						let indexes = [];
						for (let j = 0; j < neis.length; j++) {
							const nei = neis[j];
							if (!nei.hex.piece) {
								indexes.push(j);
							}
						}
						if (indexes.length > 0) {
							let grown = neis[indexes[Math.floor(Math.random()*indexes.length)]];
							placedForests.push({x: grown.x, y: grown.y});
						}
					}
				}
			}	
		}
		for (let i = 0; i < placedForests.length; i++) {
			const forest = placedForests[i];
			this.world.hexAt(forest.x,forest.y).piece = "forest";
		}	
		this.world.refresh();
	}

	private handleTileClick = (hexXY: HexXY) => {

		this.moneyWrapper.className = "hidden";
		this.drawableWorld.highlightedZone = undefined;
		
		if (hexXY.hex.team === this.currentTeam) {
			let zone =  this.world.findConnected(hexXY.x, hexXY.y);
			let capitalHex = undefined as HexXY;
			for (let i = 0; i < zone.hexes.length; i++) {
				const hex = zone.hexes[i];
				if (hex.hex.piece === "capital") {
					capitalHex = hex;
					break;
				}
			}
			if (capitalHex) {
				this.selectedZone = zone;
				this.drawableWorld.highlightedZone = this.selectedZone;
				let capital = this.world.getCapital(capitalHex.x,capitalHex.y);
				if (capital) {
					let profit = World.profit(zone);
					this.moneyDisplay.innerHTML = ""+capital.money;
					this.profitDisplay.innerHTML = ""+(profit >= 0 ? '+' : '')+(profit);
					this.profitDisplay.className = (profit > 0) ? "" : "negative";
					this.moneyWrapper.className = "";
				}
			}
		}
	}

	private handleEmptyClick = () => {
		this.drawableWorld.highlightedZone = undefined;
		this.moneyWrapper.className = "hidden";
	}

	private handleKeyDown = (evt: KeyboardEvent) => {
		if (!evt.repeat) {
			switch(evt.key) {
				case "a": this.keys.a = true; break;
				case "d": this.keys.d = true; break;
				case "w": this.keys.w = true; break;
				case "s": this.keys.s = true; break;
			}
		}
	}

	private handleKeyUp = (evt: KeyboardEvent) => {
		switch(evt.key) {
			case "a": this.keys.a = false; break;
			case "d": this.keys.d = false; break;
			case "w": this.keys.w = false; break;
			case "s": this.keys.s = false; break;
		}
	}

	private handleWheel = (evt: WheelEvent) => {

		let sign = evt.deltaY > 0 ? -1 : evt.deltaY == 0 ? 0 : 1;
		let zoom = sign > 0 ? 1.05 : 1/1.05;

		this.painter.camera.zoom *= zoom;

	}

	private handleMouseMove = (evt: MouseEvent) => {	
		this.mouse.x = evt.pageX;
		this.mouse.y = evt.pageY;
		if (this.panning) {
			this.painter.camera.x = (((this.pan.x - this.mouse.x) / this.painter.unit)/this.painter.camera.zoom) + this.pan.cx;
			this.painter.camera.y = (((this.pan.y - this.mouse.y) / this.painter.unit)/this.painter.camera.zoom) + this.pan.cy;
		}
	}

	private handleMouseDown = (evt: MouseEvent) => {
		if (evt.button == 1) this.panning = true;
	}

	private handleMouseUp = (evt: MouseEvent) => {
		if (evt.button == 1) this.panning = false;
	}

	get panning() { return this._panning; }

	set panning(pan: boolean) {
		this._panning = pan;
		if (pan) {
			this.pan.x = this.mouse.x;
			this.pan.y = this.mouse.y;
			this.pan.cx = this.painter.camera.x;
			this.pan.cy = this.painter.camera.y;
		}
	}

}