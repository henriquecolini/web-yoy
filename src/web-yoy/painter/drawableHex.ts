import Painter from "./painter";
import DrawableBounds from "./drawableBounds";

interface Point {x: number, y: number}

export default class DrawableHex extends DrawableBounds {
	
	public static PERFECT_W_TO_H = (2*Math.sqrt(3))/3;
	public static PERFECT_H_TO_W = Math.sqrt(3)/2;

	private _fill: string;
	private _stroke: string;
	private _lineWidth: number;
	private _outlines: [boolean,boolean,boolean,boolean,boolean,boolean];
	private _outlineWidth: number;
	private _outlineColor: string;

	constructor(
			painter: Painter,
			fill: string, 
			stroke: string, 
			lineWidth: number, 
			x: number = 0, 
			y: number = 0, 
			w: number = 0, 
			h: number = 0, 
			outlines?: [boolean,boolean,boolean,boolean,boolean,boolean],
			outlineWidth?: number,
			outlineColor?: string) {

		super(painter,x,y,w,h);
		this._fill = fill;
		this._stroke = stroke;
		this._lineWidth = lineWidth;

		if (outlines) {
			this._outlines = outlines;
			this._outlineColor = outlineColor;
			this._outlineWidth = outlineWidth;
		}

	}

	public static points(u: number, x: number, y: number, w: number, h: number): [Point, Point, Point, Point, Point, Point] {
		return [{x: u*(x+(w/4)), y: u*y},
			{x: u*(x+((3*w)/4)), y: u*y},
			{x: u*(x+w), y: u*(y+(h/2))},
			{x: u*(x+((3*w)/4)), y: u*(y+h)},
			{x: u*(x+(w/4)), y: u*(y+h)},
			{x: u*x, y: u*(y+(h/2))}];
	}

	public draw = () => {
		
		const ctx = this.painter.context;
		const u = this.painter.unit;
		const x = this.x;
		const y = this.y;
		const w = this.w;
		const h = this.h;

		const p = DrawableHex.points(u,x,y,w,h);
		
		ctx.strokeStyle = this._stroke;
		ctx.lineWidth = this._lineWidth*u;
		ctx.fillStyle = this._fill;

		ctx.beginPath();
		ctx.moveTo(p[0].x, p[0].y);
		ctx.lineTo(p[1].x, p[1].y);
		ctx.lineTo(p[2].x, p[2].y);
		ctx.lineTo(p[3].x, p[3].y);
		ctx.lineTo(p[4].x, p[4].y);
		ctx.lineTo(p[5].x, p[5].y);
		
		ctx.closePath();

		ctx.save();
		ctx.clip();
		ctx.lineWidth *= 2;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

		if (this._outlines) {

			ctx.strokeStyle = this._outlineColor;
			ctx.lineWidth = this._outlineWidth*u;
			
			for (let i = 0; i < 6; i++) {
				if (this._outlines[i]) {
					let next = (i==5) ? 0 : (i+1);
					ctx.beginPath();
					ctx.moveTo(p[i].x,p[i].y);
					ctx.lineTo(p[next].x,p[next].y);
					ctx.stroke();
				}
			}

		}

	}

	get fill() { return this._fill; }
	get stroke() { return this._stroke; }
	get lineWidth() { return this._lineWidth; }
	get outlines() { return this._outlines; }
	get outlineWidth() { return this._outlineWidth; }
	get outlineColor() { return this._outlineColor; }

	set fill(fill2: string) {
		this._fill = fill2;
		this.painter.draw();
	}
	set stroke(stroke2: string) {
		this._stroke = stroke2;
		this.painter.draw();
	}
	set lineWidth(lineWidth2: number) {
		this._lineWidth = lineWidth2;
		this.painter.draw();
	}
	set outlines(outlines2: [boolean,boolean,boolean,boolean,boolean,boolean]) {
		this._outlines = outlines2;
		this.painter.draw();
	}
	set outlineWidth(outlineWidth2: number) {
		this._outlineWidth = outlineWidth2;
		this.painter.draw();
	}
	set outlineColor(outlineColor2: string) {
		this._outlineColor = outlineColor2;
		this.painter.draw();
	}

}