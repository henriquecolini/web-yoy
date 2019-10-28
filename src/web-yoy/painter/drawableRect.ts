import Painter from "./painter";
import DrawableBounds from "./drawableBounds";

export default class DrawableRect extends DrawableBounds {
	
	private color: string;

	constructor(painter: Painter, color: string, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter,x,y,w,h);
		this.color = color;
	}

	public draw = () => {
		
		let ctx = this.painter.context;
		let u = this.painter.unit;
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x*u,this.y*u,this.w*u,this.h*u);

	}

}