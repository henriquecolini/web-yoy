import Painter from "./painter/painter";
import DrawableHex from "./painter/drawableHex";

let painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);
let mouseX = 0;
let mouseY = 0;

for (let x = 0; x < 20; x++) {
	for (let y = 0; y < 20; y++) {
		if (Math.random() > 0.4) {
			let w = 10;
			let h = w * DrawableHex.PERFECT_H_TO_W;		
			painter.add(
				new DrawableHex(
					painter, "#20d0F0", "#106080", 0.8,
					x*((3*w)/4),
					y*h + (x%2 === 1 ? (h/2) : 0),
					w,
					h
				)
			);
		}
	}	
}

document.addEventListener("keydown", (evt) => {
	switch(evt.key) {
		case "a": painter.camera.x -= 1; break;
		case "d": painter.camera.x += 1; break;
		case "w": painter.camera.y -= 1; break;
		case "s": painter.camera.y += 1; break;
	}
});

document.addEventListener("wheel", (evt) => {

	let sign = evt.deltaY > 0 ? -1 : evt.deltaY == 0 ? 0 : 1;
	let zoom = sign > 0 ? 1.05 : 1/1.05;

	painter.camera.zoom *= zoom;

});

document.addEventListener('mousemove', (evt) => {	
	mouseX = evt.pageX;
	mouseY = evt.pageY;
});