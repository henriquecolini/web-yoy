import Painter from "./painter";

export default abstract class Drawable {

	protected painter: Painter;

	constructor(painter: Painter) {
		this.painter = painter;
	}

	abstract draw: () => void;

}