define(["require", "exports", "../painter/painter", "./world", "../painter/drawableWorld", "../resources/levels"], function (require, exports, painter_1, world_1, drawableWorld_1, levels_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HEX_WIDTH = 5;
    class Game {
        constructor() {
            this.keys = { w: false, a: false, s: false, d: false };
            this.mouse = { x: 0, y: 0 };
            this.pan = { x: 0, y: 0, cx: 0, cy: 0 };
            this.camSpeed = 40;
            this._panning = false;
            this.currentTeamIndex = -1;
            this.currentTeam = undefined;
            this.selectedZone = undefined;
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
            this.nextTurn = (firstTime = false) => {
                this.drawableWorld.highlightedZone = undefined;
                this.moneyWrapper.className = "hidden";
                this.currentTeamIndex++;
                this.currentTeamIndex %= this.world.teams.length;
                if (!firstTime && this.currentTeamIndex === 0) {
                    for (let i = 0; i < this.world.capitals.length; i++) {
                        const capital = this.world.capitals[i];
                        capital.money += world_1.default.profit(this.world.findConnected(capital.x, capital.y));
                    }
                }
                this.currentTeam = this.world.teams[this.currentTeamIndex];
                this.teamIndicator.style.background = this.currentTeam.color;
            };
            this.handleTileClick = (hexXY) => {
                this.moneyWrapper.className = "hidden";
                if (hexXY.hex.team === this.currentTeam) {
                    let zone = this.world.findConnected(hexXY.x, hexXY.y);
                    let capitalHex = undefined;
                    for (let i = 0; i < zone.hexes.length; i++) {
                        const hex = zone.hexes[i];
                        if (hex.hex.piece === "capital") {
                            capitalHex = hex;
                            break;
                        }
                    }
                    if (capitalHex) {
                        this.selectedZone = zone;
                        this.drawableWorld.highlightedZone = this.selectedZone;
                        let capital = this.world.getCapital(capitalHex.x, capitalHex.y);
                        if (capital) {
                            let profit = world_1.default.profit(zone);
                            this.moneyDisplay.innerHTML = "" + capital.money;
                            this.profitDisplay.innerHTML = "" + (profit >= 0 ? '+' : '') + (profit);
                            this.profitDisplay.className = (profit > 0) ? "" : "negative";
                            this.moneyWrapper.className = "";
                        }
                    }
                }
            };
            this.handleEmptyClick = () => {
                this.drawableWorld.highlightedZone = undefined;
                this.moneyWrapper.className = "hidden";
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
            this.world = new world_1.default(levels_1.default.medium[0]);
            this.drawableWorld = new drawableWorld_1.default(this.painter, this.world, this.handleTileClick);
            let camPos = this.drawableWorld.midpoint;
            this.painter.camera.x = camPos.x;
            this.painter.camera.y = camPos.y;
            this.painter.add(this.drawableWorld);
            this.painter.onEmptyClick = this.handleEmptyClick;
            this.world.addChangeListener(this.drawableWorld.updateHexes);
            this.fpsCounter = document.getElementById("fps");
            this.teamIndicator = document.getElementById("team_indicator");
            this.moneyWrapper = document.getElementById("money_wrapper");
            this.moneyDisplay = document.getElementById("money");
            this.profitDisplay = document.getElementById("profit");
            this.nextTurn(true);
            document.getElementById("next_turn").addEventListener("click", () => { this.nextTurn(); });
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