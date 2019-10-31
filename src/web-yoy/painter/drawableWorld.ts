import DrawableHex from "./drawableHex";
import World, { EMPTY_COLOUR, EMPTY_BORDER_COLOUR } from "game/world";
import Drawable from "./drawable";
import Painter from "./painter";
import DrawableImage from "./drawableImage";
import DrawableZone from "./drawableZone";

export default class DrawableWorld extends Drawable {
	
	private world: World;
	private hexes: DrawableHex[];
	private zones: DrawableZone[];
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
					let cx = x*(((3*w)/4)-0.0);
					let cy = y*(h-0.0) + (x%2 === 1 ? ((h-0.0)/2) : 0);

					this.hexes.push(
						new DrawableHex(
							this.painter,
							hex.team ? hex.team.color : EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : EMPTY_BORDER_COLOUR,
							0.8,
							cx,
							cy,
							w,
							h
						)
					);
					if (hex.piece) {						
						this.pieces.push(
							new DrawableImage(
								this.painter,
								"src/images/" + hex.piece + ((hex.pieceLevel === undefined) ? ("") : ("_"+hex.pieceLevel)) + ".png",
								cx,
								cy,
								w,
								w
							)
						);
					}
				}
			}	
		}
		this.refreshZones();
	}

	public refreshZones = () => {
		this.zones = [];
		let zones = this.world.findZones();
		for (let i = 0; i < zones.length; i++) {
			const zone = zones[i];
			this.zones.push(new DrawableZone(
				this.painter,
				this.world,
				zone,
				0.5,
				"#262626",
				undefined
			));
		}
	}

	public updateHexes = () => {
		this.pieces = [];
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {
					this.hexes[(this.world.width*y)+x].fill = hex.team ? hex.team.color : EMPTY_COLOUR;
					if (hex.piece) {

						let w = 10;
						let h = w * DrawableHex.PERFECT_H_TO_W;
						let cx = x * (((3 * w) / 4) - 0.08);
						let cy = y * (h - 0.08) + (x % 2 === 1 ? ((h - 0.08) / 2) : 0);

						this.pieces.push(
							new DrawableImage(
								this.painter,
								"src/images/" + hex.piece + ((hex.pieceLevel === undefined) ? ("") : ("_" + hex.pieceLevel)) + ".png",
								cx,
								cy,
								w,
								w
							)
						);
					}
				}
			}	
		}
		this.refreshZones();
	}

	public draw = () => {		
		for (let i = 0; i < this.hexes.length; i++) this.hexes[i].draw();
		for (let i = 0; i < this.pieces.length; i++) this.pieces[i].draw();
		for (let i = 0; i < this.zones.length; i++) this.zones[i].draw();
	}

}