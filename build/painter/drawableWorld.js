define(["require", "exports", "./drawableHex", "game/world", "./drawable", "./drawableImage", "./drawableZone", "../game/game", "../resources/images"], function (require, exports, drawableHex_1, world_1, drawable_1, drawableImage_1, drawableZone_1, game_1, images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableWorld extends drawable_1.default {
        constructor(painter, world, hexClickListener) {
            super(painter);
            this.refreshZones = () => {
                this.zones = [];
                let zones = this.world.findZones();
                for (let i = 0; i < zones.length; i++) {
                    const zone = zones[i];
                    this.zones.push(new drawableZone_1.default(this.painter, this.world, zone, 0.25, "#262626"));
                }
            };
            this.updateHexes = () => {
                this.pieces = [];
                for (let i = 0; i < this.hexes.length; i++) {
                    const drawHex = this.hexes[i];
                    const hex = this.world.hexAt(drawHex.x, drawHex.y);
                    if (hex) {
                        drawHex.drawHex.fill = hex.team ? hex.team.color : world_1.EMPTY_COLOUR;
                        if (hex.piece) {
                            let over = 0.04;
                            let w = game_1.HEX_WIDTH;
                            let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                            let cx = (drawHex.x * ((3 * w) / 4)) - (over / 2);
                            let cy = (drawHex.y * h + (drawHex.x % 2 === 1 ? (h / 2) : 0)) - (over / 2);
                            this.pieces.push(new drawableImage_1.default(this.painter, images_1.default.piece(hex.piece), cx, cy, w + over, w + over));
                        }
                    }
                }
                this.refreshZones();
            };
            this.draw = () => {
                for (let i = 0; i < this.hexes.length; i++)
                    this.hexes[i].drawHex.draw();
                for (let i = 0; i < this.zones.length; i++)
                    this.zones[i].draw();
                for (let i = 0; i < this.pieces.length; i++)
                    this.pieces[i].draw();
                if (this._highlightedZone)
                    this._highlightedZone.draw();
            };
            this.world = world;
            this.hexes = [];
            this.pieces = [];
            for (let x = 0; x < this.world.width; x++) {
                for (let y = 0; y < this.world.height; y++) {
                    const hex = this.world.hexAt(x, y);
                    if (hex) {
                        let over = 0.04;
                        let w = game_1.HEX_WIDTH;
                        let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                        let cx = (x * ((3 * w) / 4)) - (over / 2);
                        let cy = (y * h + (x % 2 === 1 ? (h / 2) : 0)) - (over / 2);
                        this.hexes.push({
                            drawHex: new drawableHex_1.default(this.painter, hex.team ? hex.team.color : world_1.EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : world_1.EMPTY_BORDER_COLOUR, 0.4, cx, cy, w + over, h + over, hexClickListener ?
                                () => {
                                    hexClickListener({ hex: hex, x: x, y: y });
                                }
                                : undefined),
                            x: x,
                            y: y
                        });
                        if (hex.piece) {
                            this.pieces.push(new drawableImage_1.default(this.painter, images_1.default.piece(hex.piece), cx, cy, w + over, w + over));
                        }
                    }
                }
            }
            this.refreshZones();
        }
        set highlightedZone(zone) {
            this._highlightedZone = zone ? new drawableZone_1.default(this.painter, this.world, zone, 0.15, "#ffffff", [0.25, 0.25]) : undefined;
            this.painter.draw();
        }
        get midpoint() {
            let averageX = 0;
            let averageY = 0;
            for (let i = 0; i < this.hexes.length; i++) {
                const draw = this.hexes[i].drawHex;
                if (draw) {
                    averageX += draw.x + (draw.w / 2);
                    averageY += draw.y + (draw.h / 2);
                }
            }
            return { x: averageX / this.hexes.length, y: averageY / this.hexes.length };
        }
    }
    exports.default = DrawableWorld;
});
//# sourceMappingURL=drawableWorld.js.map