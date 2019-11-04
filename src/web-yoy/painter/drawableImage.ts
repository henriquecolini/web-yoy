import DrawableBounds from "./drawableBounds";
import Painter from "./painter";
import { LoadedImage } from "../resources/images";

export default class DrawableImage extends DrawableBounds {
	
	private image: LoadedImage;
	private isLoaded = false;

	constructor(painter: Painter, image: LoadedImage, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter,x,y,w,h);
		this.image = image;				
		this.image.onload = () => {
			this.isLoaded = true;
			painter.draw();
		}
	}

	public draw = () => {
		if (this.isLoaded) {
			let ctx = this.painter.context;
			let u = this.painter.unit;
			ctx.drawImage(this.image.image,u*this.x,u*this.y,u*this.w,u*this.h);
		}
	}

}