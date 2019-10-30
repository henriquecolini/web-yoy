define(["require", "exports", "./painter/painter", "./painter/drawableHex"], function (require, exports, painter_1, drawableHex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.mouse = { x: 0, y: 0 };
            this.pan = { x: 0, y: 0, cx: 0, cy: 0 };
            this.camMovement = { x: 0, y: 0 };
            this._panning = false;
            this.handleKeyDown = (evt) => {
                switch (evt.key) {
                    case "a":
                        this.camMovement.x -= 1;
                        break;
                    case "d":
                        this.camMovement.x += 1;
                        break;
                    case "w":
                        this.camMovement.y -= 1;
                        break;
                    case "s":
                        this.camMovement.y += 1;
                        break;
                }
            };
            this.handleKeyUp = (evt) => {
                switch (evt.key) {
                    case "a":
                        this.camMovement.x += 1;
                        break;
                    case "d":
                        this.camMovement.x -= 1;
                        break;
                    case "w":
                        this.camMovement.y += 1;
                        break;
                    case "s":
                        this.camMovement.y -= 1;
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
            for (let x = 0; x < 20; x++) {
                for (let y = 0; y < 20; y++) {
                    if (Math.random() > 0.4) {
                        let w = 10;
                        let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                        this.painter.add(new drawableHex_1.default(this.painter, "#20d0F0", "#106080", 0.8, x * ((3 * w) / 4), y * h + (x % 2 === 1 ? (h / 2) : 0), w, h));
                    }
                }
            }
            document.addEventListener("keydown", this.handleKeyDown);
            document.addEventListener("keyup", this.handleKeyUp);
            document.addEventListener("wheel", this.handleWheel);
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('mouseenter', this.handleMouseMove);
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