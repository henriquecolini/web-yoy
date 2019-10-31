import Drawable from "./drawable";
import Clickable from "./clickable";
import DrawableRect from "./drawableRect";

export default class Painter {

	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;
	private _unit: number = 1;
	private _camera = new Camera(this, 0, 0, 1);

	private drawables: Drawable[];
	private clickables: Clickable[];

	constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		this._context = canvas.getContext("2d");
		this.drawables = [];
		this.clickables = [];
		window.addEventListener("resize", this.updateSize);
		this.updateSize();
		canvas.addEventListener("mousedown", this.handleClick);
		this.add(new DrawableRect(this, "red", -0.5, -0.5, 1, 1));
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

	private handleClick = (evt: MouseEvent) => {
		if (evt.button === 0) {
			for (let i = 0; i < this.clickables.length; i++) {
				const clickable = this.clickables[i];
				let {x,y} = this.camera.screenToWorld(evt.x, evt.y);
				if (clickable.isHovering(x,y)) clickable.onClick();
			}
		}
	}

	public add = (drawable: Drawable) => {
		this.drawables.push(drawable);
		this.draw();
	}

	public remove = (drawable: Drawable) => {
		this.drawables.splice(this.drawables.indexOf(drawable));
		this.draw();
	}

	public registerClickable = (clickable: Clickable) => {
		this.clickables.push(clickable);
		this.draw();
	}

	public unregisterClickable = (clickable: Clickable) => {
		this.clickables.splice(this.clickables.indexOf(clickable));
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

	public screenToWorld = (screenX: number, screenY: number): {x: number, y: number} => {

		let u = this.painter.unit;
		let w = this.painter.canvas.width;
		let h = this.painter.canvas.height;

		// I'm not sure what I did but it works

		return {
			x: ((screenX/u) - ((w/2)/u) + (this.x * this.zoom)) / this.zoom,
			y: ((screenY/u) - ((h/2)/u) + (this.y * this.zoom)) / this.zoom
		};
		
	}

	get x() { return this._x; }
	get y() { return this._y; }
	get zoom() { return this._zoom; }
	set x(x2: number) { this._x = x2; this.painter.draw(); }
	set y(y2: number) { this._y = y2; this.painter.draw(); }
	set zoom(zoom2: number) { this._zoom = zoom2; this.painter.draw(); }

}