define(["require", "exports", "./painter/painter", "./world", "./painter/drawableWorld"], function (require, exports, painter_1, world_1, drawableWorld_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.keys = { w: false, a: false, s: false, d: false };
            this.mouse = { x: 0, y: 0 };
            this.pan = { x: 0, y: 0, cx: 0, cy: 0 };
            this.camSpeed = 40;
            this._panning = false;
            this.update = (deltaTime) => {
                let camMove = { x: 0, y: 0 };
                camMove.x += this.keys.a ? -1 : 0;
                camMove.x += this.keys.d ? 1 : 0;
                camMove.y += this.keys.w ? -1 : 0;
                camMove.y += this.keys.s ? 1 : 0;
                if (camMove.x != 0 && camMove.y != 0) {
                    camMove.y /= Math.SQRT2;
                    camMove.x /= Math.SQRT2;
                }
                this.painter.camera.x += (camMove.x * this.camSpeed) * deltaTime;
                this.painter.camera.y += (camMove.y * this.camSpeed) * deltaTime;
                this.fpsCounter.innerHTML = Math.ceil(1 / deltaTime) + " fps";
            };
            this.handleKeyDown = (evt) => {
                if (!evt.repeat) {
                    switch (evt.key) {
                        case "a":
                            this.keys.a = true;
                            break;
                        case "d":
                            this.keys.d = true;
                            break;
                        case "w":
                            this.keys.w = true;
                            break;
                        case "s":
                            this.keys.s = true;
                            break;
                    }
                }
            };
            this.handleKeyUp = (evt) => {
                switch (evt.key) {
                    case "a":
                        this.keys.a = false;
                        break;
                    case "d":
                        this.keys.d = false;
                        break;
                    case "w":
                        this.keys.w = false;
                        break;
                    case "s":
                        this.keys.s = false;
                        break;
                }
            };
            this.handleWheel = (evt) => {
                let sign = evt.deltaY > 0 ? -1 : evt.deltaY == 0 ? 0 : 1;
                let zoom = sign > 0 ? 1.05 : 1 / 1.05;
                this.painter.camera.zoom *= zoom;
            };
            this.handleMouseMove = (evt) => {
                this.mouse.x = evt.pageX;
                this.mouse.y = evt.pageY;
                if (this.panning) {
                    this.painter.camera.x = (((this.pan.x - this.mouse.x) / this.painter.unit) / this.painter.camera.zoom) + this.pan.cx;
                    this.painter.camera.y = (((this.pan.y - this.mouse.y) / this.painter.unit) / this.painter.camera.zoom) + this.pan.cy;
                }
            };
            this.handleMouseDown = (evt) => {
                if (evt.button == 1)
                    this.panning = true;
            };
            this.handleMouseUp = (evt) => {
                if (evt.button == 1)
                    this.panning = false;
            };
            this.painter = new painter_1.default(document.getElementById("canvas"));
            this.world = new world_1.default(4, 20, 20);
            this.drawableWorld = new drawableWorld_1.default(this.painter, this.world);
            this.painter.add(this.drawableWorld);
            this.fpsCounter = document.getElementById("fps");
            document.addEventListener("keydown", this.handleKeyDown);
            document.addEventListener("keyup", this.handleKeyUp);
            document.addEventListener("wheel", this.handleWheel);
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('mouseenter', this.handleMouseMove);
            let last = undefined;
            const frame = (timeStamp) => {
                let curr = timeStamp;
                this.update(last ? (curr - last) / 1000 : 1 / 60);
                last = curr;
                window.requestAnimationFrame(frame);
            };
            window.requestAnimationFrame(frame);
        }
        get panning() { return this._panning; }
        set panning(pan) {
            this._panning = pan;
            if (pan) {
                this.pan.x = this.mouse.x;
                this.pan.y = this.mouse.y;
                this.pan.cx = this.painter.camera.x;
                this.pan.cy = this.painter.camera.y;
            }
        }
    }
    exports.default = Game;
});
//# sourceMappingURL=game.js.map