import { Level } from "../resources/levels";
import Pieces, { Piece } from "../resources/pieces";

export interface Zone {
	team: Team,
	hexes: HexXY[]
}

export interface Hex {
	team: Team,
	piece: Piece
}

export interface HexXY {
	hex: Hex,
	x: number,
	y: number
}

export interface Team {
	color: string
}

export const EMPTY_COLOUR = "#82b551";
export const EMPTY_BORDER_COLOUR = "#88bf54";

export const STD_COLOURS = [
	"#4fd2db",
	"#f79a36",
	"#d45d5d",
	"#459647",
	"#575cb5",
	"#c246b5",
	"#d1c73f",
	"#40cf77",
	"#7d391a",
	"#f26a68"
];

export default class World {

	private _world: Hex[][];
	private _width: number;
	private _height: number;
	private _teams: Team[];
	private _capitals: {
		money: number,
		name: string,
		x: number,
		y: number
	}[];
	private changeListeners: (()=>void)[];

	constructor(level: Level) {

		this.changeListeners = [];
		this._width = level.width;

		this._teams = [];
		for (let i = 0; i < level.teamCount; i++) this._teams[i] = {color: STD_COLOURS[i%STD_COLOURS.length]};

		this._capitals = [];
		for (let i = 0; i < level.capitals.length; i++) this._capitals[i] = {money: level.capitals[i].money, name: level.capitals[i].name, x: undefined, y: undefined};

		let strMap = level.map.split(" ");
		this._world = [];

		let foundCapitals = [] as {hex: Hex, teamIndex: number, capitalIndex: number, x: number, y: number}[];

		for (let i = 0; i < strMap.length; i++) {

			const str = strMap[i];
			let hex: Hex = undefined;

			let x = i%this._width;
			let y = Math.floor(i/this._width);

			if (str !== ".") {

				if (str === "#") hex = { team: undefined, piece: undefined };
				else {
					let parts = str.split("$");
				
					let teamIndex = parts[0] ? parseInt(parts[0]) : undefined;
					let capitalIndex = parts[1] ? parseInt(parts[1]) : undefined;

					if (teamIndex !== undefined) {
						hex = { team: this._teams[teamIndex], piece: capitalIndex !== undefined ? "capital" : undefined };
						if (capitalIndex !== undefined) {
							this._capitals[capitalIndex].x = x;
							this._capitals[capitalIndex].y = y;
						}
					}
				}
			}

			if (!this._world[x]) {this._world[x] = [];}
			this._world[x][y] = hex;

		}

		for (let i = 0; i < level.pieces.length; i++) {
			const piece = level.pieces[i];
			this._world[piece.x][piece.y].piece = piece.type;
		}

		let height = 0;

		for (let x = 0; x < this._world.length; x++) {
			const column = this._world[x];
			if (column.length > height) height = column.length;
		}

		this._height = height;

	}

	public getCapital(x: number, y: number) {
		if (this.hexAt(x,y) && this.hexAt(x,y).piece === "capital") {
			for (let i = 0; i < this._capitals.length; i++) {
				const cap = this._capitals[i];
				if (cap.x == x && cap.y == y) return cap;
			}
		}
		return undefined;
	}

	public hexAt(x: number, y: number): Hex {
		return this._world[x] ? this._world[x][y] : undefined;
	}

	public neighbours(x: number, y: number): HexXY[] {
		let zig = (2*(x%2))-1;
		let list = [];
		let n0 = this.hexAt(x,y-1);
		let n1 = this.hexAt(x-1,y);
		let n2 = this.hexAt(x+1,y);
		let n3 = this.hexAt(x,y+1);
		let n4 = this.hexAt(x-1,y+zig);
		let n5 = this.hexAt(x+1,y+zig);
		if(n0) list.push({hex: n0, x: x, y: y-1});
		if(n1) list.push({hex: n1, x: x-1, y: y});
		if(n2) list.push({hex: n2, x: x+1, y: y});
		if(n3) list.push({hex: n3, x: x, y: y+1});
		if(n4) list.push({hex: n4, x: x-1, y: y+zig});
		if(n5) list.push({hex: n5, x: x+1, y: y+zig});
		return list;
	}

	public findConnected(x: number, y: number): Zone {
		let targetTeam = this.hexAt(x,y).team;
		let connected = [] as HexXY[];
		let ignore = [] as Hex[];
		const sub = (sx: number, sy: number) => {
			let hex = this.hexAt(sx,sy);
			connected.push({hex: hex, x: sx, y: sy});
			ignore.push(hex);
			let neis = this.neighbours(sx,sy);
			for (let i = 0; i < neis.length; i++) {
				const nei = neis[i];
				if ((nei.hex.team === targetTeam) && (ignore.indexOf(nei.hex) < 0)) sub(nei.x, nei.y);
			}
		}
		sub(x,y);
		return {hexes: connected, team: targetTeam};
	}

	public findZones(): Zone[] {

		let found = [] as Hex[];
		let zones = [] as Zone[];

		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				const hex = this.hexAt(x,y);
				if(hex && found.indexOf(hex) < 0) {
					let zone = this.findConnected(x,y);
					found.push(...(zone.hexes.map((hexXY)=>{return hexXY.hex})));
					zones.push(zone);
				}
			}
		}

		return zones;

	}

	public static zoneOf(zones: Zone[], hex: Hex): Zone {
		for (let i = 0; i < zones.length; i++) {
			const zone = zones[i];
			for (let j = 0; j < zone.hexes.length; j++) if (hex === zone.hexes[j].hex) return zone;
		}
		return undefined;
	}

	public static profit(zone: Zone): number {
		let p = 0;
		for (let i = 0; i < zone.hexes.length; i++) {
			const hex = zone.hexes[i];
			p += 1 + (hex.hex.piece ? Pieces.values(hex.hex.piece).profit : 0);
		}
		return p;
	}

	private onChange() {
		for (let i = 0; i < this.changeListeners.length; i++) this.changeListeners[i]();
	}

	public addChangeListener(listener: ()=>void) {
		this.changeListeners.push(listener);
	}

	public removeChangeListener(listener: ()=>void) {
		this.changeListeners.splice(this.changeListeners.indexOf(listener));
	}

	public clearChangeListeners() {
		this.changeListeners = [];
	}

	get world() { return this._world; }
	get width() { return this._width; }
	get height() { return this._height; }
	get teams() { return this._teams; }
	get capitals() { return this._capitals; }

}