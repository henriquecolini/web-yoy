import { Level } from "./levels";

export interface Hex {
	team: Team,
	piece: "capital"|"farm"|"forest"|"tower"|"unit",
	pieceLevel: number
}

export interface Team {
	color: string
}

export const EMPTY_COLOUR = "#616161";

export const STD_COLOURS = [
	"#d45d5d",
	"#5da4d4",
	"#459647",
	"#575cb5",
	"#c246b5",
	"#d1c73f",
	"#40cf77",
	"#7d391a",
	"#753c7a",
	"#8d9963"
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

				if (str === "#") hex = { team: undefined, piece: undefined, pieceLevel: undefined };
				else {
					let parts = str.split("$");
				
					let teamIndex = parts[0] ? parseInt(parts[0]) : undefined;
					let capitalIndex = parts[1] ? parseInt(parts[1]) : undefined;

					if (teamIndex !== undefined) {
						hex = { team: this._teams[teamIndex], piece: capitalIndex !== undefined ? "capital" : undefined, pieceLevel: undefined };
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
			this._world[piece.x][piece.y].pieceLevel = piece.level;
		}

		let height = 0;

		for (let x = 0; x < this._world.length; x++) {
			const column = this._world[x];
			if (column.length > height) height = column.length;
		}

		this._height = height;

	}

	public hexAt(x: number, y: number): Hex {
		return this._world[x] ? this._world[x][y] : undefined;
	}

	public neighbours(x: number, y: number) {
		let list = [];
		let n1 = this.hexAt(x,y-1);
		let n2 = this.hexAt(x-1,y);
		let n3 = this.hexAt(x+1,y);
		let n4 = this.hexAt(x,y+1);
		let n5 = this.hexAt(x-1,y+1);
		let n6 = this.hexAt(x+1,y+1);
		if(n1) list.push({hex: n1, xOff: 0, yOff: -1});
		if(n2) list.push({hex: n2, xOff: -1, yOff: 0});
		if(n3) list.push({hex: n3, xOff: 1, yOff: 0});
		if(n4) list.push({hex: n4, xOff: 0, yOff: 1});
		if(n5) list.push({hex: n5, xOff: -1, yOff: 1});
		if(n6) list.push({hex: n6, xOff: 1, yOff: 1});
		return list;
	}

	public findConnected(x: number, y: number): Hex[] {
		let targetTeam = this.hexAt(x,y).team;
		let visited = [] as Hex[];
		const sub = (sx: number, sy: number) => {
			visited.push(this.hexAt(sx,sy));
			let neis = this.neighbours(sx,sy);
			for (let i = 0; i < neis.length; i++) {
				const nei = neis[i];
				if ((nei.hex.team === targetTeam) && (visited.indexOf(nei.hex) < 0)) sub(sx+nei.xOff, sy+nei.yOff);
			}
		}
		sub(x,y);
		return visited;
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