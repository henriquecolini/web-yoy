import Drawable from "./drawable";

export default class Painter {

	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;
	private _unit: number = 1;
	private _camera = new Camera(this, 0, 0, 1);

	private drawables: Drawable[];

	constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		this._context = canvas.getContext("2d");
		this.drawables = [];
		window.addEventListener("resize", this.updateSize);
		this.updateSize();
	}

	public draw = () => {
		
		this._context.setTransform(1,0,0,1,0,0);
		this._context.clearRect(0,0,this._canvas.width,this._canvas.height);

		this.camera.apply();
		
		for (let i = 0; i < this.drawables.length; i++) this.drawables[i].draw();
	}

	private updateSize = () => {
		let oldMatix = this.context.getTransform();
		this._canvas.height = document.documentElement.clientHeight;
		this._canvas.width = document.documentElement.clientWidth;
		this._unit = this._canvas.width / 100;
		this.context.setTransform(oldMatix);
		this.draw();
	}

	public add = (drawable: Drawable) => {
		this.drawables.push(drawable);
		this.draw();
	}

	public remove = (drawable: Drawable) => {
		this.drawables.splice(this.drawables.indexOf(drawable));
		this.draw();
	}

	get unit() { return this._unit; }
	get canvas() { return this._canvas; }
	get context() { return this._context; }	
	get camera() { return this._camera; }

}

class Camera {

	private _x: number;
	private _y: number;
	private _zoom: number;
	private painter: Painter;

	constructor (painter: Painter, x: number, y: number, zoom: number) {
		this.painter = painter;
		this._x = x;
		this._y = y;
		this._zoom = zoom;
	}

	public apply = () => {
		
		const u = this.painter.unit;
		const z = this._zoom;
		const x = this._x;
		const y = this._y;
		const w = this.painter.canvas.width;
		const h = this.painter.canvas.height;

		this.painter.context.translate(u*(((w/2)/u)),u*(((h/2)/u)));
		this.painter.context.scale(z,z);
		this.painter.context.translate(u*(-x), u*(-y));

	}

	get x() { return this._x; }
	get y() { return this._y; }
	get zoom() { return this._zoom; }
	set x(x2: number) { this._x = x2; this.painter.draw(); }
	set y(y2: number) { this._y = y2; this.painter.draw(); }
	set zoom(zoom2: number) { this._zoom = zoom2; this.painter.draw(); }

}