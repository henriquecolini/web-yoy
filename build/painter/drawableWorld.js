define(["require", "exports", "./drawableHex", "game/world", "./drawable", "./drawableImage", "./drawableZone"], function (require, exports, drawableHex_1, world_1, drawable_1, drawableImage_1, drawableZone_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableWorld extends drawable_1.default {
        constructor(painter, world) {
            super(painter);
            this.refreshZones = () => {
                this.zones = [];
                let zones = this.world.findZones();
                for (let i = 0; i < zones.length; i++) {
                    const zone = zones[i];
                    this.zones.push(new drawableZone_1.default(this.painter, this.world, zone, 0.5, "#262626", undefined));
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
            };
            this.world = world;
            this.hexes = [];
            this.pieces = [];
            for (let x = 0; x < this.world.width; x++) {
                for (let y = 0; y < this.world.height; y++) {
                    const hex = this.world.hexAt(x, y);
                    if (hex) {
                        let w = 10;
                        let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                        let cx = x * (((3 * w) / 4) - 0.0);
                        let cy = y * (h - 0.0) + (x % 2 === 1 ? ((h - 0.0) / 2) : 0);
                        this.hexes.push(new drawableHex_1.default(this.painter, hex.team ? hex.team.color : world_1.EMPTY_COLOUR, hex.team ? "rgba(0,0,0,0.2)" : world_1.EMPTY_BORDER_COLOUR, 0.8, cx, cy, w, h));
                        if (hex.piece) {
                            this.pieces.push(new drawableImage_1.default(this.painter, "src/images/" + hex.piece + ((hex.pieceLevel === undefined) ? ("") : ("_" + hex.pieceLevel)) + ".png", cx, cy, w, w));
                        }
                    }
                }
            }
            this.refreshZones();
        }
    }
    exports.default = DrawableWorld;
});
//# sourceMappingURL=drawableWorld.js.map