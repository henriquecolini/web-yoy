import Painter from "./painter/painter";
import DrawableRect from "./painter/drawableRect";

let painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);

painter.add(new DrawableRect(painter, "red", 2, 2, 1, 1))