import DrawableHex from "./drawableHex";
import World, { EMPTY_COLOUR, EMPTY_BORDER_COLOUR, HexXY, Zone } from "game/world";
import Drawable from "./drawable";
import Painter from "./painter";
import DrawableImage from "./drawableImage";
import DrawableZone from "./drawableZone";
import { HEX_WIDTH } from "../game/game";
import Images from "../resources/images";

export default class DrawableWorld extends Drawable {
	
	private world: World;
	private hexes: DrawableHex[];
	private zones: DrawableZone[];
	private pieces: DrawableImage[];
	private _highlightedZone: DrawableZone;

	constructor(painter: Painter, world: World, hexClickListener?: (hexXY: HexXY)=>void) {
		super(painter);
		this.world = world;
		this.hexes = [];
		this.pieces = [];
		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const hex = this.world.hexAt(x,y);
				if (hex) {

					let over = 0.04;
					let w = HEX_WIDTH;
					let h = w * DrawableHex.PERFECT_H_TO_W;
					let cx = (x*((3*w)/4)) - (over/2);
					let cy = (y*h + (x%2 === 1 ? (h/2) : 0)) - (over/2);

					this.hexes.push(
						new DrawableHex(
							this.painter,
							hex.team ? hex.team.color : EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : EMPTY_BORDER_COLOUR,
							0.4,
							cx,
							cy,
							w+over,
							h+over,
							hexClickListener ? 
							() => {
								hexClickListener({hex: hex, x: x, y: y});
							}
							: undefined
						)
					);
					if (hex.piece) {						
						this.pieces.push(
							new DrawableImage(
								this.painter,
								Images.piece(hex.piece),
								cx,
								cy,
								w+over,
								w+over
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
				0.25,
				"#262626"
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
								Images.piece(hex.piece),
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
		if (this._highlightedZone) this._highlightedZone.draw();
	}

	set highlightedZone(zone: Zone) {
		this._highlightedZone = zone? new DrawableZone(
			this.painter,
			this.world,
			zone,
			0.15,
			"#ffffff",
			[0.25,0.25]
		) : undefined;
		this.painter.draw();
	}

	get midpoint(): {x: number, y: number} {

		let averageX = 0;
		let averageY = 0;
		let inc = 0;

		for (let x = 0; x < this.world.width; x++) {
			for (let y = 0; y < this.world.height; y++) {
				const draw = this.hexes[inc];
				if (draw) {
					averageX += draw.x + (draw.w/2);
					averageY += draw.y + (draw.h/2);
					inc++;
				}
			}
		}

		return {x: averageX/inc, y: averageY/inc};

	}

}