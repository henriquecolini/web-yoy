import Drawable from "./drawable";
import Painter from "./painter";

export default abstract class DrawableBounds extends Drawable {
	
	private x_: number;
	private y_: number;
	private w_: number;
	private h_: number;

	constructor(painter: Painter, x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		super(painter);
		this.x_ = x;
		this.y_ = y;
		this.w_ = w;
		this.h_ = h;
	}

	get x() { return this.x_; };
	get y() { return this.y_; };
	get w() { return this.w_; };
	get h() { return this.h_; };

	set x(x2: number) {
		this.x_ = x2;
		this.painter.draw();
	}

	set y(y2: number) {
		this.y_ = y2;
		this.painter.draw();
	}

	set w(w2: number) {
		this.w_ = w2;
		this.painter.draw();
	}

	set h(h2: number) {
		this.h_ = h2;
		this.painter.draw();
	}

}