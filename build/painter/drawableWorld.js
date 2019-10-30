define(["require", "exports", "./drawableHex", "../world", "./drawable"], function (require, exports, drawableHex_1, world_1, drawable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableWorld extends drawable_1.default {
        constructor(painter, world) {
            super(painter);
            this.updateHexes = () => {
                for (let x = 0; x < this.world.width; x++) {
                    for (let y = 0; y < this.world.height; y++) {
                        const hex = this.world.hexAt(x, y);
                        if (hex) {
                            this.drawWorld[(this.world.width * y) + x].fill = hex.team ? hex.team.color : world_1.EMPTY_COLOUR;
                        }
                    }
                }
            };
            this.draw = () => {
                for (let i = 0; i < this.drawWorld.length; i++)
                    this.drawWorld[i].draw();
            };
            this.world = world;
            this.drawWorld = [];
            for (let x = 0; x < this.world.width; x++) {
                for (let y = 0; y < this.world.height; y++) {
                    const hex = this.world.hexAt(x, y);
                    if (hex) {
                        let w = 10;
                        let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                        this.drawWorld.push(new drawableHex_1.default(this.painter, hex.team ? hex.team.color : world_1.EMPTY_COLOUR, "#000000", 0.8, x * ((3 * w) / 4), y * h + (x % 2 === 1 ? (h / 2) : 0), w, h));
                    }
                }
            }
        }
    }
    exports.default = DrawableWorld;
});
//# sourceMappingURL=drawableWorld.js.map