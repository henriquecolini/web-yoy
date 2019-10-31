import DrawableBounds from "./drawableBounds";
import Painter from "./painter";

export default class DrawableImage extends DrawableBounds {
	
	private image: HTMLImageElement;
	private isLoaded = false;

	constructor(painter: Painter, imageSrc: string, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter,x,y,w,h);
		this.image = new Image();
		this.image.onload = () => {
			this.isLoaded = true;
			painter.draw();
		}
		this.image.src = imageSrc;
	}

	public draw = () => {
		if (this.isLoaded) {
			let ctx = this.painter.context;
			let u = this.painter.unit;
			ctx.drawImage(this.image,u*this.x,u*this.y,u*this.w,u*this.h);
		}
	}

	set imageSrc(imageSrc2: string) {
		this.isLoaded = false;
		this.image.src = imageSrc2;
	}

}