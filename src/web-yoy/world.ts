export interface Hex {
	team: Team,
	piece: "capital"|"farm"|"forest"|"tower"|"infantry",
	pieceLevel: number
}

export interface Team {
	color: string,
	money: number,
	zones: Hex[][]
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

	private _world: Hex[];
	private _width: number;
	private _height: number;
	private _teams: Team[];
	private changeListeners: (()=>void)[];

	constructor(teamCount: number, worldWidth: number, worldHeight: number) {
		this._teams = [];
		this._width = worldWidth;
		this._height = worldHeight;
		this.changeListeners = [];
		for (let i = 0; i < teamCount; i++) {
			this._teams[i] = {color: STD_COLOURS[i%STD_COLOURS.length], money: 0, zones: []};
		}
		this._world = [];
		for (let x = 0; x < worldWidth; x++) {
			for (let y = 0; y < worldHeight; y++) {
				this._world[(worldWidth*y)+x] = {team: undefined, piece: undefined, pieceLevel: undefined};
			}
		}
		let sides: Hex[] = [];
		for (let i = 0; i < this._world.length; i++) {
			let {x,y} = this.unpackXY(i);			
			if (this.neighbours(x,y).length < 6) sides.push(this._world[i]);
		}
		// console.log(sides);
		
		if (sides.length >= teamCount) {
			let teamI = 0;
			for (let teamI = 0; teamI < teamCount; teamI++) {
				let index = Math.floor(Math.random()*sides.length);
				console.log(index);
				
				sides[index].team = this._teams[teamI];
				this._teams[teamI].zones = [[sides[index]]];
				sides.splice(index,1);
			}
		}
	}

	public unpackXY(i: number): {x: number, y: number} {
		return {x: i%this._width, y: Math.floor(i/this._width)};
	}

	public hexAt(x: number, y: number) {
		return this._world[(this._width*y)+x];
	}

	public neighbours(x: number, y: number) {
		let list = [];
		let n1 = this.hexAt(x,y-1);
		let n2 = this.hexAt(x-1,y);
		let n3 = this.hexAt(x+1,y);
		let n4 = this.hexAt(x,y+1);
		let n5 = this.hexAt(x-1,y+1);
		let n6 = this.hexAt(x+1,y+1);
		if(n1) list.push(n1);
		if(n2) list.push(n2);
		if(n3) list.push(n3);
		if(n4) list.push(n4);
		if(n5) list.push(n5);
		if(n6) list.push(n6);
		return list;
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

}