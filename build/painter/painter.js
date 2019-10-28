define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Painter {
        constructor(canvas) {
            this.draw = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.drawables.length; i++)
                    this.drawables[i].draw();
            };
            this.updateSize = () => {
                this.canvas.height = document.documentElement.clientHeight;
                this.canvas.width = document.documentElement.clientWidth;
                this.u = this.canvas.width / 10;
                this.draw();
            };
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.drawables = [];
            window.addEventListener("resize", this.updateSize);
            this.updateSize();
        }
        add(drawable) {
            this.drawables.push(drawable);
            this.draw();
        }
        remove(drawable) {
            this.drawables.splice(this.drawables.indexOf(drawable));
            this.draw();
        }
        get unit() {
            return this.u;
        }
        get context() {
            return this.ctx;
        }
    }
    exports.default = Painter;
});
//# sourceMappingURL=painter.js.map