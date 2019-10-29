define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableHex extends drawableBounds_1.default {
        constructor(painter, color, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.draw = () => {
                let ctx = this.painter.context;
                let u = this.painter.unit;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(u * (this.x + (this.w / 4)), u * this.y);
                ctx.lineTo(u * (this.x + ((3 * this.w) / 4)), u * this.y);
                ctx.lineTo(u * (this.x + this.w), u * (this.y + (this.h / 2)));
                ctx.lineTo(u * (this.x + ((3 * this.w) / 4)), u * (this.y + this.h));
                ctx.lineTo(u * (this.x + (this.w / 4)), u * (this.y + this.h));
                ctx.lineTo(u * this.x, u * (this.y + (this.h / 2)));
                ctx.fill();
            };
            this.color = color;
        }
    }
    DrawableHex.PERFECT_W_TO_H = (2 * Math.sqrt(3)) / 3;
    DrawableHex.PERFECT_H_TO_W = Math.sqrt(3) / 2;
    exports.default = DrawableHex;
});
//# sourceMappingURL=drawableHex.js.map