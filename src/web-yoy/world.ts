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
	}

	public hexAt(x: number, y: number) {
		return this._world[(this._width*y)+x];
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