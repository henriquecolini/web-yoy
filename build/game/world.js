define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EMPTY_COLOUR = "#82b551";
    exports.EMPTY_BORDER_COLOUR = "#88bf54";
    exports.STD_COLOURS = [
        "#d45d5d",
        "#5da4d4",
        "#459647",
        "#575cb5",
        "#c246b5",
        "#d1c73f",
        "#40cf77",
        "#7d391a",
        "#753c7a",
        "#8d9963"
    ];
    class World {
        constructor(level) {
            this.changeListeners = [];
            this._width = level.width;
            this._teams = [];
            for (let i = 0; i < level.teamCount; i++)
                this._teams[i] = { color: exports.STD_COLOURS[i % exports.STD_COLOURS.length] };
            this._capitals = [];
            for (let i = 0; i < level.capitals.length; i++)
                this._capitals[i] = { money: level.capitals[i].money, name: level.capitals[i].name, x: undefined, y: undefined };
            let strMap = level.map.split(" ");
            this._world = [];
            let foundCapitals = [];
            for (let i = 0; i < strMap.length; i++) {
                const str = strMap[i];
                let hex = undefined;
                let x = i % this._width;
                let y = Math.floor(i / this._width);
                if (str !== ".") {
                    if (str === "#")
                        hex = { team: undefined, piece: undefined, pieceLevel: undefined };
                    else {
                        let parts = str.split("$");
                        let teamIndex = parts[0] ? parseInt(parts[0]) : undefined;
                        let capitalIndex = parts[1] ? parseInt(parts[1]) : undefined;
                        if (teamIndex !== undefined) {
                            hex = { team: this._teams[teamIndex], piece: capitalIndex !== undefined ? "capital" : undefined, pieceLevel: undefined };
                            if (capitalIndex !== undefined) {
                                this._capitals[capitalIndex].x = x;
                                this._capitals[capitalIndex].y = y;
                            }
                        }
                    }
                }
                if (!this._world[x]) {
                    this._world[x] = [];
                }
                this._world[x][y] = hex;
            }
            for (let i = 0; i < level.pieces.length; i++) {
                const piece = level.pieces[i];
                this._world[piece.x][piece.y].piece = piece.type;
                this._world[piece.x][piece.y].pieceLevel = piece.level;
            }
            let height = 0;
            for (let x = 0; x < this._world.length; x++) {
                const column = this._world[x];
                if (column.length > height)
                    height = column.length;
            }
            this._height = height;
        }
        hexAt(x, y) {
            return this._world[x] ? this._world[x][y] : undefined;
        }
        neighbours(x, y) {
            let zig = (2 * (x % 2)) - 1;
            let list = [];
            let n0 = this.hexAt(x, y - 1);
            let n1 = this.hexAt(x - 1, y);
            let n2 = this.hexAt(x + 1, y);
            let n3 = this.hexAt(x, y + 1);
            let n4 = this.hexAt(x - 1, y + zig);
            let n5 = this.hexAt(x + 1, y + zig);
            if (n0)
                list.push({ hex: n0, xOff: 0, yOff: -1 });
            if (n1)
                list.push({ hex: n1, xOff: -1, yOff: 0 });
            if (n2)
                list.push({ hex: n2, xOff: 1, yOff: 0 });
            if (n3)
                list.push({ hex: n3, xOff: 0, yOff: 1 });
            if (n4)
                list.push({ hex: n4, xOff: -1, yOff: zig });
            if (n5)
                list.push({ hex: n5, xOff: 1, yOff: zig });
            return list;
        }
        findConnected(x, y) {
            let targetTeam = this.hexAt(x, y).team;
            let visited = [];
            const sub = (sx, sy) => {
                visited.push(this.hexAt(sx, sy));
                let neis = this.neighbours(sx, sy);
                for (let i = 0; i < neis.length; i++) {
                    const nei = neis[i];
                    if ((nei.hex.team === targetTeam) && (visited.indexOf(nei.hex) < 0))
                        sub(sx + nei.xOff, sy + nei.yOff);
                }
            };
            sub(x, y);
            return visited;
        }
        addChangeListener(listener) {
            this.changeListeners.push(listener);
        }
        removeChangeListener(listener) {
            this.changeListeners.splice(this.changeListeners.indexOf(listener));
        }
        clearChangeListeners() {
            this.changeListeners = [];
        }
        get world() { return this._world; }
        get width() { return this._width; }
        get height() { return this._height; }
        get teams() { return this._teams; }
        get capitals() { return this._capitals; }
    }
    exports.default = World;
});
//# sourceMappingURL=world.js.map