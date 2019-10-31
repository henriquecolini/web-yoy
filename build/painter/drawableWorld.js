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
                for (let x = 0; x < this.world.width; x++) {
                    for (let y = 0; y < this.world.height; y++) {
                        const hex = this.world.hexAt(x, y);
                        if (hex) {
                            this.hexes[(this.world.width * y) + x].fill = hex.team ? hex.team.color : world_1.EMPTY_COLOUR;
                            if (hex.piece) {
                                let w = 10;
                                let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                                let cx = x * (((3 * w) / 4) - 0.08);
                                let cy = y * (h - 0.08) + (x % 2 === 1 ? ((h - 0.08) / 2) : 0);
                                this.pieces.push(new drawableImage_1.default(this.painter, "src/images/" + hex.piece + ((hex.pieceLevel === undefined) ? ("") : ("_" + hex.pieceLevel)) + ".png", cx, cy, w, w));
                            }
                        }
                    }
                }
                this.refreshZones();
            };
            this.draw = () => {
                for (let i = 0; i < this.hexes.length; i++)
                    this.hexes[i].draw();
                for (let i = 0; i < this.pieces.length; i++)
                    this.pieces[i].draw();
                for (let i = 0; i < this.zones.length; i++)
                    this.zones[i].draw();
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
                        this.hexes.push(new drawableHex_1.default(this.painter, hex.team ? hex.team.color : world_1.EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : world_1.EMPTY_BORDER_COLOUR, 0.4, cx, cy, w + over, h + over, hexClickListener ?
                            () => {
                                hexClickListener({ hex: hex, x: x, y: y });
                            }
                            : undefined));
                        if (hex.piece) {
                            this.pieces.push(new drawableImage_1.default(this.painter, images_1.default.piece(hex.piece, hex.pieceLevel), cx, cy, w + over, w + over));
                        }
                    }
                }
            }
            this.refreshZones();
        }
        set highlightedZone(zone) {
            this._highlightedZone = zone ? new drawableZone_1.default(this.painter, this.world, zone, 0.3, "#ffffff", [0.5, 0.5]) : undefined;
            this.painter.draw();
        }
        get midpoint() {
            let averageX = 0;
            let averageY = 0;
            let inc = 0;
            for (let x = 0; x < this.world.width; x++) {
                for (let y = 0; y < this.world.height; y++) {
                    const draw = this.hexes[inc];
                    if (draw) {
                        averageX += draw.x + (draw.w / 2);
                        averageY += draw.y + (draw.h / 2);
                        inc++;
                    }
                }
            }
            return { x: averageX / inc, y: averageY / inc };
        }
    }
    exports.default = DrawableWorld;
});
//# sourceMappingURL=drawableWorld.js.map