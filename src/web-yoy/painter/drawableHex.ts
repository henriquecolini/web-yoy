import Painter from "./painter";
import DrawableBounds from "./drawableBounds";
import Clickable from "./clickable";

interface Point {x: number, y: number}

export default class DrawableHex extends DrawableBounds implements Clickable {
	
	public static PERFECT_W_TO_H = (2*Math.sqrt(3))/3;
	public static PERFECT_H_TO_W = Math.sqrt(3)/2;

	private _fill: string;
	private _stroke: string;
	private _lineWidth: number;
	private clickListener: () => void;

	constructor(
			painter: Painter,
			fill: string, 
			stroke: string, 
			lineWidth: number, 
			x: number = 0, 
			y: number = 0, 
			w: number = 0, 
			h: number = 0,
			clickListener?: ()=>void) {

		super(painter,x,y,w,h);
		this._fill = fill;
		this._stroke = stroke;
		this._lineWidth = lineWidth;
		if (clickListener) this.clickListener = clickListener;
		painter.registerClickable(this);

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

	}

	public onClick = () => {
		if (this.clickListener)
			this.clickListener();
	}

	public isHovering = (x: number, y: number) => {
		x-=(this.w/2);
		y-=(this.h/2);
		return (((this.x-x)*(this.x-x))+((this.y-y)*(this.y-y))) < ((this.w/2)*(this.w/2));
	}

	get fill() { return this._fill; }
	get stroke() { return this._stroke; }
	get lineWidth() { return this._lineWidth; }

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
	
}