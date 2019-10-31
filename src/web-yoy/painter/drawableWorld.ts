import DrawableHex from "./drawableHex";
import World, { EMPTY_COLOUR, EMPTY_BORDER_COLOUR } from "game/world";
import Drawable from "./drawable";
import Painter from "./painter";
import DrawableImage from "./drawableImage";

export default class DrawableWorld extends Drawable {
	
	private world: World;
	private hexes: DrawableHex[];
	private pieces: DrawableImage[];

	constructor(painter: Painter, world: World) {
		super(painter);
		this.world = world;
		this.hexes = [];
		this.pieces = [];
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {

					let w = 10;
					let h = w * DrawableHex.PERFECT_H_TO_W;
					let cx = x*(((3*w)/4)-0.08);
					let cy = y*(h-0.08) + (x%2 === 1 ? ((h-0.08)/2) : 0);

					let n0 = this.world.hexAt(x,y-1);
					let n3 = this.world.hexAt(x,y+1);

					let zig = -(x%2)+1; 

					let n1 = this.world.hexAt(x+1,y-zig);
					let n2 = this.world.hexAt(x+1,y+1-zig);
					let n4 = this.world.hexAt(x-1,y+1-zig);
					let n5 = this.world.hexAt(x-1,y-zig);

					this.hexes.push(
						new DrawableHex(
							this.painter,
							hex.team ? hex.team.color : EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : EMPTY_BORDER_COLOUR,
							0.8,
							cx,
							cy,
							w,
							h,
							[
								!n0 || (n0.team != hex.team),
								!n1 || (n1.team != hex.team),
								!n2 || (n2.team != hex.team),
								!n3 || (n3.team != hex.team),
								!n4 || (n4.team != hex.team),
								!n5 || (n5.team != hex.team),
							],
							0.4,
							"#000"
						)
					);
					if (hex.piece) {
						console.log(hex.piece);
						
						this.pieces.push(
							new DrawableImage(
								this.painter,
								"src/images/" + hex.piece + ((hex.pieceLevel === undefined) ? ("") : ("_"+hex.pieceLevel)) + ".png",
								cx,
								cy,
								w,
								w // not wrong
							)
						);
					}
				}
			}	
		}
	}

	public updateHexes = () => {
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {
					this.hexes[(this.world.width*y)+x].fill = hex.team ? hex.team.color : EMPTY_COLOUR;
				}
			}	
		}
	}

	public draw = () => {		
		for (let i = 0; i < this.hexes.length; i++) this.hexes[i].draw();
		for (let i = 0; i < this.pieces.length; i++) this.pieces[i].draw();
	}

}