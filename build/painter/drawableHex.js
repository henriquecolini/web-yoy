define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableHex extends drawableBounds_1.default {
        constructor(painter, fill, stroke, lineWidth, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.draw = () => {
                const ctx = this.painter.context;
                const u = this.painter.unit;
                const x = this.x;
                const y = this.y;
                const w = this.w;
                const h = this.h;
                const p = DrawableHex.points(u, x, y, w, h);
                ctx.strokeStyle = this._stroke;
                ctx.lineWidth = this._lineWidth * u;
                ctx.fillStyle = this._fill;
                ctx.beginPath();
                ctx.moveTo(p[0].x, p[0].y);
                ctx.lineTo(p[1].x, p[1].y);
                ctx.lineTo(p[2].x, p[2].y);
                ctx.lineTo(p[3].x, p[3].y);
                ctx.lineTo(p[4].x, p[4].y);
                ctx.lineTo(p[5].x, p[5].y);
                ctx.closePath();
                ctx.save();
                ctx.clip();
                ctx.lineWidth *= 2;
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            };
            this._fill = fill;
            this._stroke = stroke;
            this._lineWidth = lineWidth;
        }
        static points(u, x, y, w, h) {
            return [{ x: u * (x + (w / 4)), y: u * y },
                { x: u * (x + ((3 * w) / 4)), y: u * y },
                { x: u * (x + w), y: u * (y + (h / 2)) },
                { x: u * (x + ((3 * w) / 4)), y: u * (y + h) },
                { x: u * (x + (w / 4)), y: u * (y + h) },
                { x: u * x, y: u * (y + (h / 2)) }];
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