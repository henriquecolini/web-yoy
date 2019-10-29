import Painter from "./painter/painter";
import DrawableRect from "./painter/drawableRect";

let painter = new Painter(document.getElementById("canvas") as HTMLCanvasElement);

painter.add(new DrawableRect(painter, "red", 0, 0, 10, 10))

document.addEventListener("keydown", (evt) => {
	switch(evt.key) {
		case "a": painter.x -= 1; break;
		case "d": painter.x += 1; break;
		case "w": painter.y -= 1; break;
		case "s": painter.y += 1; break;
	}
});

document.addEventListener("wheel", (evt) => {

	// evt.preventDefault();	
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