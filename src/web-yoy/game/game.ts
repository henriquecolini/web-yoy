import Painter from "../painter/painter";
import DrawableHex from "../painter/drawableHex";
import World, { EMPTY_COLOUR, HexXY } from "./world";
import DrawableWorld from "../painter/drawableWorld";
import LEVELS from "./levels";

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

	constructor() {

		this.painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);
		this.world = new World(LEVELS.medium[0]);
		this.drawableWorld = new DrawableWorld(this.painter, this.world, this.handleTileClick);
				
		this.painter.add(this.drawableWorld);
		this.world.addChangeListener(this.drawableWorld.updateHexes);

		this.fpsCounter = document.getElementById("fps");

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

	private handleTileClick = (hexXY: HexXY) => {
		
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