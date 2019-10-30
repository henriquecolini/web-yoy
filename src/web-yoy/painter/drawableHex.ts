import Painter from "./painter";
import DrawableBounds from "./drawableBounds";

export default class DrawableHex extends DrawableBounds {
	
	public static PERFECT_W_TO_H = (2*Math.sqrt(3))/3;
	public static PERFECT_H_TO_W = Math.sqrt(3)/2;

	private _fill: string;
	private _stroke: string;
	private _lineWidth: number;

	constructor(painter: Painter, fill: string, stroke: string, lineWidth: number, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter,x,y,w,h);
		this._fill = fill;
		this._stroke = stroke;
		this._lineWidth = lineWidth;
	}

	public draw = () => {
		
		let ctx = this.painter.context;
		let u = this.painter.unit;
		
		ctx.strokeStyle = this._stroke;
		ctx.lineWidth = this._lineWidth*u;
		ctx.fillStyle = this._fill;

		ctx.beginPath();
		ctx.moveTo(u*(this.x+(this.w/4)),u*this.y);
		ctx.lineTo(u*(this.x+((3*this.w)/4)),u*this.y);
		ctx.lineTo(u*(this.x+this.w),u*(this.y+(this.h/2)));
		ctx.lineTo(u*(this.x+((3*this.w)/4)),u*(this.y+this.h));
		ctx.lineTo(u*(this.x+(this.w/4)),u*(this.y+this.h));
		ctx.lineTo(u*this.x,u*(this.y+(this.h/2)));
		
		ctx.closePath();

		ctx.fill();
		ctx.stroke();

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