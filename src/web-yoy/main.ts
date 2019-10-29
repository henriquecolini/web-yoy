import Painter from "./painter/painter";
import DrawableHex from "./painter/drawableHex";

let painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);

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
		case "a": painter.x -= 1; break;
		case "d": painter.x += 1; break;
		case "w": painter.y -= 1; break;
		case "s": painter.y += 1; break;
	}
});

document.addEventListener("wheel", (evt) => {

	let sign = evt.deltaY > 0 ? -1 : evt.deltaY == 0 ? 0 : 1;
	let zoom = sign > 0 ? 1.05 : 1/1.05;

	painter.zoomAbout(zoom, (painter.canvas.width/painter.unit)/2, (painter.canvas.height/painter.unit)/2)

	// let times = 5;
	// let i = 0;

	// clearInterval(scrollHandler);

	// scrollHandler = setInterval(()=>{
	// 	if (i >= times) clearInterval(scrollHandler);
	// 	else {			
	// 		camera.zoom *= sign > 0 ? 1.01 : 1/1.01;
	// 		draw();
	// 		i++;
	// 	}
	// }, 1);

});