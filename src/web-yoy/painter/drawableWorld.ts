import DrawableHex from "./drawableHex";
import World, { EMPTY_COLOUR } from "../world";
import Drawable from "./drawable";
import Painter from "./painter";

export default class DrawableWorld extends Drawable {
	
	private world: World;
	private drawWorld: DrawableHex[];

	constructor(painter: Painter, world: World) {
		super(painter);
		this.world = world;
		this.drawWorld = [];
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {
					let w = 10;
					let h = w * DrawableHex.PERFECT_H_TO_W;		
					this.drawWorld.push(
						new DrawableHex(
							this.painter, hex.team ? hex.team.color : EMPTY_COLOUR, "#000000", 0.8,
							x*((3*w)/4),
							y*h + (x%2 === 1 ? (h/2) : 0),
							w,
							h
						)
					);
				}
			}	
		}
	}

	public updateHexes = () => {
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {
					this.drawWorld[(this.world.width*y)+x].fill = hex.team ? hex.team.color : EMPTY_COLOUR;
				}
			}	
		}
	}

	public draw = () => {		
		for (let i = 0; i < this.drawWorld.length; i++) this.drawWorld[i].draw();
	}

}