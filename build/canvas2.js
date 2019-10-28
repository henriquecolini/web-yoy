define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Canvas2 {
        constructor(canvas) {
            this.draw = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(30, 30, 30, 30);
            };
            this.updateSize = () => {
                this.canvas.height = document.documentElement.clientHeight;
                this.canvas.width = document.documentElement.clientWidth;
                this.__unit = this.canvas.width / 10;
                this.draw();
            };
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            window.addEventListener("resize", this.updateSize);
            this.updateSize();
        }
        get unit() {
            return this.__unit;
        }
    }
    exports.default = Canvas2;
});
//# sourceMappingURL=canvas2.js.map