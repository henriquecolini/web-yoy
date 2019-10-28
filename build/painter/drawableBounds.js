define(["require", "exports", "./drawable"], function (require, exports, drawable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableBounds extends drawable_1.default {
        constructor(painter, x = 0, y = 0, w = 0, h = 0) {
            super(painter);
            this.x_ = x;
            this.y_ = y;
            this.w_ = w;
            this.h_ = h;
        }
        get x() { return this.x_; }
        ;
        get y() { return this.y_; }
        ;
        get w() { return this.w_; }
        ;
        get h() { return this.h_; }
        ;
        set x(x2) {
            this.x_ = x2;
            this.painter.draw();
        }
        set y(y2) {
            this.y_ = y2;
            this.painter.draw();
        }
        set w(w2) {
            this.w_ = w2;
            this.painter.draw();
        }
        set h(h2) {
            this.h_ = h2;
            this.painter.draw();
        }
    }
    exports.default = DrawableBounds;
});
//# sourceMappingURL=drawableBounds.js.map