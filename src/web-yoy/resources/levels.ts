export interface Level {
	teamCount: number,
	capitals: {money: number, name: string}[],
	pieces: {x: number, y: number, type: "farm"|"forest"|"tower"|"unit", level?: number}[],
	width: number,
	map: string;
}

const LEVELS = {
	medium: [
		{
			teamCount: 2,
			capitals: [
				{money: 10, name: "City A1"},
				{money: 10, name: "City A2"},
				{money: 10, name: "City B1"},
				{money: 10, name: "City B2"}
			],
			pieces: [
				{x: 3, y: 3, type: "forest"},
				{x: 4, y: 3, type: "forest"},
				{x: 2, y: 3, type: "forest"},
				{x: 8, y: 7, type: "forest"},
				{x: 8, y: 8, type: "forest"}
			],
			width: 12,
			map: 
			". . . . 0 0$0 0 0 . . . . " + 
			". . . # 0 0 0 0 # . . . " + 
			". . # # # # # # # # . . " + 
			". 1 # # # # # # # # 1 . " + 
			"1 1 # # # . . . # # 1 1 " + 
			"1$2 1 # # . . . . # # 1 1$1 " + 
			"1 1 # # # . . . # # 1 1 " + 
			". 1 # # # # # # # # 1 . " + 
			". . # # # # # # # # . . " + 
			". . . # 0 0 0 0 # . . . " + 
			". . . . 0 0 0$3 0 . . . ."
		}
	] as Level[]
};

export default LEVELS;