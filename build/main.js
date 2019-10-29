define(["require", "exports", "./painter/painter", "./painter/drawableHex"], function (require, exports, painter_1, drawableHex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let painter = new painter_1.default(document.getElementById("canvas"));
    let mouseX = 0;
    let mouseY = 0;
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            if (Math.random() > 0.4) {
                let w = 10;
                let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                painter.add(new drawableHex_1.default(painter, "#20d0F0", "#106080", 0.8, x * ((3 * w) / 4), y * h + (x % 2 === 1 ? (h / 2) : 0), w, h));
            }
        }
    }
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
        let px = (painter.canvas.width / 2) / painter.unit;
        let py = (painter.canvas.height / 2) / painter.unit;
        painter.zoomAbout(zoom, px, py);
    });
    document.addEventListener('mousemove', (evt) => {
        mouseX = evt.pageX;
        mouseY = evt.pageY;
    });
});
//# sourceMappingURL=main.js.map