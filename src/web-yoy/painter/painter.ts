import Drawable from "./drawable";

export default class Painter {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private u: number;

	private drawables: Drawable[];

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.drawables = [];
		window.addEventListener("resize", this.updateSize);
		this.updateSize();
	}

	public draw = () => {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		for (let i = 0; i < this.drawables.length; i++) this.drawables[i].draw();
	}

	private updateSize = () => {
		this.canvas.height = document.documentElement.clientHeight;
		this.canvas.width = document.documentElement.clientWidth;
		this.u = this.canvas.width / 10;
		this.draw();
	}

	public add(drawable: Drawable) {
		this.drawables.push(drawable);
		this.draw();
	}

	public remove(drawable: Drawable) {
		this.drawables.splice(this.drawables.indexOf(drawable));
		this.draw();
	}

	get unit() {
		return this.u;
	}

	get context() {
		return this.ctx;
	}

}