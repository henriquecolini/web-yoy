define(["require", "exports", "./drawableBounds"], function (require, exports, drawableBounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableImage extends drawableBounds_1.default {
        constructor(painter, imageSrc, x = 0, y = 0, w = 0, h = 0) {
            super(painter, x, y, w, h);
            this.isLoaded = false;
            this.draw = () => {
                if (this.isLoaded) {
                    let ctx = this.painter.context;
                    let u = this.painter.unit;
                    ctx.drawImage(this.image, u * this.x, u * this.y, u * this.w, u * this.h);
                }
            };
            this.image = new Image();
            this.image.onload = () => {
                this.isLoaded = true;
                painter.draw();
            };
            this.image.src = imageSrc;
        }
        set imageSrc(imageSrc2) {
            this.isLoaded = false;
            this.image.src = imageSrc2;
        }
    }
    exports.default = DrawableImage;
});
//# sourceMappingURL=drawableImage.js.map