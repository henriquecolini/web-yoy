define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Painter {
        constructor(canvas) {
            this._unit = 1;
            this._camera = new Camera(this, 0, 0, 1);
            this.draw = () => {
                this._context.setTransform(1, 0, 0, 1, 0, 0);
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                this.camera.apply();
                for (let i = 0; i < this.drawables.length; i++)
                    this.drawables[i].draw();
            };
            this.updateSize = () => {
                let oldMatix = this.context.getTransform();
                this._canvas.height = document.documentElement.clientHeight;
                this._canvas.width = document.documentElement.clientWidth;
                this._unit = this._canvas.width / 100;
                this.context.setTransform(oldMatix);
                this.draw();
            };
            this.handleClick = (evt) => {
                if (evt.button === 0) {
                    let anything = false;
                    for (let i = 0; i < this.clickables.length; i++) {
                        const clickable = this.clickables[i];
                        let { x, y } = this.camera.screenToWorld(evt.x, evt.y);
                        if (clickable.isHovering(x, y)) {
                            clickable.onClick();
                            anything = true;
                            break;
                        }
                    }
                    if (!anything && this._onEmptyClick)
                        this._onEmptyClick();
                }
            };
            this.add = (drawable) => {
                this.drawables.push(drawable);
                this.draw();
            };
            this.remove = (drawable) => {
                this.drawables.splice(this.drawables.indexOf(drawable));
                this.draw();
            };
            this.registerClickable = (clickable) => {
                this.clickables.push(clickable);
                this.draw();
            };
            this.unregisterClickable = (clickable) => {
                this.clickables.splice(this.clickables.indexOf(clickable));
                this.draw();
            };
            this._canvas = canvas;
            this._context = canvas.getContext("2d");
            this.drawables = [];
            this.clickables = [];
            window.addEventListener("resize", this.updateSize);
            this.updateSize();
            canvas.addEventListener("mousedown", this.handleClick);
        }
        get unit() { return this._unit; }
        get canvas() { return this._canvas; }
        get context() { return this._context; }
        get camera() { return this._camera; }
        set onEmptyClick(fun) {
            this._onEmptyClick = fun;
        }
    }
    exports.default = Painter;
    class Camera {
        constructor(painter, x, y, zoom) {
            this.apply = () => {
                const u = this.painter.unit;
                const z = this._zoom;
                const x = this._x;
                const y = this._y;
                const w = this.painter.canvas.width;
                const h = this.painter.canvas.height;
                this.painter.context.translate(u * (((w / 2) / u)), u * (((h / 2) / u)));
                this.painter.context.scale(z, z);
                this.painter.context.translate(u * (-x), u * (-y));
            };
            this.screenToWorld = (screenX, screenY) => {
                let u = this.painter.unit;
                let w = this.painter.canvas.width;
                let h = this.painter.canvas.height;
                return {
                    x: ((screenX / u) - ((w / 2) / u) + (this.x * this.zoom)) / this.zoom,
                    y: ((screenY / u) - ((h / 2) / u) + (this.y * this.zoom)) / this.zoom
                };
            };
            this.painter = painter;
            this._x = x;
            this._y = y;
            this._zoom = zoom;
        }
        get x() { return this._x; }
        get y() { return this._y; }
        get zoom() { return this._zoom; }
        set x(x2) { this._x = x2; this.painter.draw(); }
        set y(y2) { this._y = y2; this.painter.draw(); }
        set zoom(zoom2) { this._zoom = zoom2; this.painter.draw(); }
    }
});
//# sourceMappingURL=painter.js.map