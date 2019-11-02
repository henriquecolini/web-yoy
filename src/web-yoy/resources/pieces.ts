export type Piece = "capital"|"farm"|"tower"|"big_tower"|"peasant"|"spearman"|"knight"|"warrior"|"grave"|"forest";
export interface PieceData {profit: number, price?: number, def: number, atk?: number, spread?: number};

interface PieceList {
    [key: string]: PieceData;
}

const pieces: PieceList = {
	"capital": {profit: 0, def: 0},
	"farm": {profit: 4, def: 0},
	"tower": {price: 15, profit: 0, def: 2},
	"big_tower": {price: 35, profit: 0, def: 3},
	"peasant": {price: 10, profit: -2, def: 1, atk: 1},
	"spearman": {price: 20, profit: -6, def: 2, atk: 2},
	"knight": {price: 30, profit: -18, def: 3, atk: 3},
	"warrior": {price: 40, profit: -36, def: 3, atk: 4},
	"grave": {profit: -1, def: 0},
	"forest": {profit: -1, def: 0, spread: 0.5}
}

export default class Pieces {
	public static values(type: string): PieceData {
		let val = pieces[type];
		return val;
	}
}