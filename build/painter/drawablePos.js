define(["require", "exports", "drawable"], function (require, exports, drawable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableXY extends drawable_1.default {
        get x() { return this.x_; }
        ;
        get y() { return this.y_; }
        ;
        set x(x2) {
            this.x_ = x2;
            this.painter.draw();
        }
        set y(y2) {
            this.y_ = y2;
            this.painter.draw();
        }
    }
    exports.default = DrawableXY;
});
//# sourceMappingURL=drawablePos.js.map