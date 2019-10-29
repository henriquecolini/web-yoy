import Painter from "./painter";
import DrawableBounds from "./drawableBounds";

export default class DrawableHex extends DrawableBounds {
	
	public static PERFECT_W_TO_H = (2*Math.sqrt(3))/3;
	public static PERFECT_H_TO_W = Math.sqrt(3)/2;

	private fill: string;
	private stroke: string;
	private lineWidth: number;

	constructor(painter: Painter, fill: string, stroke: string, lineWidth: number, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter,x,y,w,h);
		this.fill = fill;
		this.stroke = stroke;
		this.lineWidth = lineWidth;
	}

	public draw = () => {
		
		let ctx = this.painter.context;
		let u = this.painter.unit;
		
		ctx.strokeStyle = this.stroke;
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.fill;

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

}