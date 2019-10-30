export interface Level {
	teams: {zones: {money: number, name: string}[], human?: boolean}[];
	pieces: {x: number, y: number, type: "farm"|"forest"|"tower"|"unit", level?: number}[]
	width: number,
	map: string;
}

const LEVELS = {
	medium: [
		{
			teams: [
				{zones: [{money: 10, name: "City A1"}, {money: 10, name: "City A2"}]},
				{zones: [{money: 10, name: "City B1"}, {money: 10, name: "City B2"}]},
			],
			pieces: [],
			width: 12,
			map: 
			". . . . 0 0$0 0 0 . . . ." + 
			". . . # 0 0 0 0 # . . ." + 
			". . # # # # # # # # . ." + 
			". 1 # # # # # # # # 1 ." + 
			"1 1 # # # # . # # # 1 1" + 
			"1$0 1 # # . . . # # # 1 1$1" + 
			"1 1 # # # # . # # # 1 1" + 
			". 1 # # # # # # # # 1 ." + 
			". . # # # # # # # # . ." + 
			". . . # 0 0 0 0 # . . ." + 
			". . . . 0 0 0$1 0 . . . ."
		}
	] as Level[]
};

export default LEVELS;