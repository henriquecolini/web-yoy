define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Painter {
        constructor(canvas) {
            this.unit_ = 1;
            this.x_ = 0;
            this.y_ = 0;
            this.zoom_ = 1;
            this.draw = () => {
                let u = this.unit_;
                let z = this.zoom_;
                let x = this.x_;
                let y = this.y_;
                let ctx = this.context_;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, this.canvas_.width, this.canvas_.height);
                ctx.restore();
                for (let i = 0; i < this.drawables.length; i++)
                    this.drawables[i].draw();
            };
            this.updateSize = () => {
                let oldMatix = this.context.getTransform();
                this.canvas_.height = document.documentElement.clientHeight;
                this.canvas_.width = document.documentElement.clientWidth;
                this.unit_ = this.canvas_.width / 100;
                this.context.setTransform(oldMatix);
                this.draw();
            };
            this.canvas_ = canvas;
            this.context_ = canvas.getContext("2d");
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
        get unit() { return this.unit_; }
        get canvas() { return this.canvas_; }
        get context() { return this.context_; }
        get x() { return this.x_; }
        get y() { return this.y_; }
        get zoom() { return this.zoom_; }
        set x(x2) {
            this.context_.transform(1, 0, 0, 1, this.unit_ * (this.x_ - x2), 0);
            this.x_ = x2;
            this.draw();
        }
        set y(y2) {
            this.context_.transform(1, 0, 0, 1, 0, this.unit_ * (this.y_ - y2));
            this.y_ = y2;
            this.draw();
        }
        zoomAbout(z, x = 0, y = 0) {
            this.context_.transform(1, 0, 0, 1, (x + this.x_) * this.unit_, (y + this.y_) * this.unit_);
            this.context_.transform(z, 0, 0, z, 0, 0);
            this.context_.transform(1, 0, 0, 1, -(x + this.x_) * this.unit_, -(y + this.y_) * this.unit_);
            this.zoom_ *= z;
            this.draw();
        }
    }
    exports.default = Painter;
});
//# sourceMappingURL=painter.js.map