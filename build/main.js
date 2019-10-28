define(["require", "exports", "./painter/painter", "./painter/drawableRect"], function (require, exports, painter_1, drawableRect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let painter = new painter_1.default(document.getElementById("canvas"));
    painter.add(new drawableRect_1.default(painter, "red", 2, 2, 1, 1));
});
//# sourceMappingURL=main.js.map