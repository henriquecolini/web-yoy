define(["require", "exports", "./drawable", "./drawableHex"], function (require, exports, drawable_1, drawableHex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DrawableZone extends drawable_1.default {
        constructor(painter, world, zone, lineWidth, stroke, fill) {
            super(painter);
            this.draw = () => {
            };
            this.recalculatePoints = () => {
                let lines = [];
                for (let i = 0; i < this._zone.hexes.length; i++) {
                    const hexXY = this._zone.hexes[i];
                    const hex = hexXY.hex;
                    const x = hexXY.x;
                    const y = hexXY.y;
                    if (hex) {
                        let w = 10;
                        let h = w * drawableHex_1.default.PERFECT_H_TO_W;
                        let cx = x * (((3 * w) / 4) - 0.08);
                        let cy = y * (h - 0.08) + (x % 2 === 1 ? ((h - 0.08) / 2) : 0);
                        let n0 = this.world.hexAt(x, y - 1);
                        let n3 = this.world.hexAt(x, y + 1);
                        let zig = -(x % 2) + 1;
                        let n1 = this.world.hexAt(x + 1, y - zig);
                        let n2 = this.world.hexAt(x + 1, y + 1 - zig);
                        let n4 = this.world.hexAt(x - 1, y + 1 - zig);
                        let n5 = this.world.hexAt(x - 1, y - zig);
                        let outlines = [
                            !n0 || (n0.team != hex.team),
                            !n1 || (n1.team != hex.team),
                            !n2 || (n2.team != hex.team),
                            !n3 || (n3.team != hex.team),
                            !n4 || (n4.team != hex.team),
                            !n5 || (n5.team != hex.team),
                        ];
                        let p = drawableHex_1.default.points(this.painter.unit, cx, cy, w, h);
                        for (let i = 0; i < 6; i++) {
                            if (outlines[i]) {
                                let next = (i == 5) ? 0 : (i + 1);
                                lines.push({
                                    x1: p[i].x,
                                    y1: p[i].y,
                                    x2: p[next].x,
                                    y2: p[next].y,
                                });
                            }
                        }
                    }
                }
            };
            this.world = world;
            this._zone = zone;
            this._lineWidth = lineWidth;
            this._fill = fill;
            this._stroke = stroke;
            this.recalculatePoints();
        }
        get zone() { return this._zone; }
        get lineWidth() { return this._lineWidth; }
        get fill() { return this._fill; }
        get stroke() { return this._stroke; }
        set zone(zone2) {
            this._zone = zone2;
            this.recalculatePoints();
            this.painter.draw();
        }
        set lineWidth(lineWidth2) {
            this._lineWidth = lineWidth2;
            this.painter.draw();
        }
        set fill(fill2) {
            this._fill = fill2;
            this.painter.draw();
        }
        set stroke(stroke2) {
            this._stroke = stroke2;
            this.painter.draw();
        }
    }
    exports.default = DrawableZone;
});
//# sourceMappingURL=drawableZone.js.map