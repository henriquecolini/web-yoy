define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableHex extends drawableBounds_1.default {
        constructor(painter, fill, stroke, lineWidth, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.draw = () => {
                let ctx = this.painter.context;
                let u = this.painter.unit;
                ctx.strokeStyle = this._stroke;
                ctx.lineWidth = this._lineWidth * u;
                ctx.fillStyle = this._fill;
                ctx.beginPath();
                ctx.moveTo(u * (this.x + (this.w / 4)), u * this.y);
                ctx.lineTo(u * (this.x + ((3 * this.w) / 4)), u * this.y);
                ctx.lineTo(u * (this.x + this.w), u * (this.y + (this.h / 2)));
                ctx.lineTo(u * (this.x + ((3 * this.w) / 4)), u * (this.y + this.h));
                ctx.lineTo(u * (this.x + (this.w / 4)), u * (this.y + this.h));
                ctx.lineTo(u * this.x, u * (this.y + (this.h / 2)));
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            };
            this._fill = fill;
            this._stroke = stroke;
            this._lineWidth = lineWidth;
        }
        get fill() { return this._fill; }
        get stroke() { return this._stroke; }
        get lineWidth() { return this._lineWidth; }
        set fill(fill2) {
            this._fill = fill2;
            this.painter.draw();
        }
        set stroke(stroke2) {
            this._stroke = stroke2;
            this.painter.draw();
        }
        set lineWidth(lineWidth2) {
            this._lineWidth = lineWidth2;
            this.painter.draw();
        }
    }
    DrawableHex.PERFECT_W_TO_H = (2 * Math.sqrt(3)) / 3;
    DrawableHex.PERFECT_H_TO_W = Math.sqrt(3) / 2;
    exports.default = DrawableHex;
});
//# sourceMappingURL=drawableHex.js.map