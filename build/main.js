define(["require", "exports", "./painter/painter", "./painter/drawableRect"], function (require, exports, painter_1, drawableRect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let painter = new painter_1.default(document.getElementById("canvas"));
    painter.add(new drawableRect_1.default(painter, "red", 0, 0, 10, 10));
    document.addEventListener("keydown", (evt) => {
        switch (evt.key) {
            case "a":
                painter.x -= 1;
                break;
            case "d":
                painter.x += 1;
                break;
            case "w":
                painter.y -= 1;
                break;
            case "s":
                painter.y += 1;
                break;
        }
    });
    document.addEventListener("wheel", (evt) => {
        let sign = evt.deltaY > 0 ? -1 : evt.deltaY == 0 ? 0 : 1;
        let zoom = sign > 0 ? 1.05 : 1 / 1.05;
        painter.zoomAbout(zoom, (painter.canvas.width / painter.unit) / 2, (painter.canvas.height / painter.unit) / 2);
    });
});
//# sourceMappingURL=main.js.map