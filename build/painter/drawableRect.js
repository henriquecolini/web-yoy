define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableRect extends drawableBounds_1.default {
        constructor(painter, color, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.draw = () => {
                let ctx = this.painter.context;
                let u = this.painter.unit;
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x * u, this.y * u, this.w * u, this.h * u);
            };
            this.color = color;
        }
    }
    exports.default = DrawableRect;
});
//# sourceMappingURL=drawableRect.js.map