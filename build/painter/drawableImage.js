define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableImage extends drawableBounds_1.default {
        constructor(painter, image, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.isLoaded = false;
            this.draw = () => {
                if (this.isLoaded) {
                    let ctx = this.painter.context;
                    let u = this.painter.unit;
                    ctx.drawImage(this.image.image, u * this.x, u * this.y, u * this.w, u * this.h);
                }
            };
            this.image = image;
            this.image.onload = () => {
                this.isLoaded = true;
                painter.draw();
            };
        }
    }
    exports.default = DrawableImage;
});
//# sourceMappingURL=drawableImage.js.map