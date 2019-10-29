define(["require", "exports", "./painter/painter", "./painter/drawableHex"], function (require, exports, painter_1, drawableHex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let painter = new painter_1.default(document.getElementById("canvas"));
    painter.add(new drawableHex_1.default(painter, "#20d0F0", "#106080", 5, 0, 0, 10, 10 * drawableHex_1.default.PERFECT_H_TO_W));
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