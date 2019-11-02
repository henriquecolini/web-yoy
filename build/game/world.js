define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EMPTY_COLOUR = "#82b551";
    exports.EMPTY_BORDER_COLOUR = "#88bf54";
    exports.STD_COLOURS = [
        "#4fd2db",
        "#f79a36",
        "#d45d5d",
        "#459647",
        "#575cb5",
        "#c246b5",
        "#d1c73f",
        "#40cf77",
        "#7d391a",
        "#f26a68"
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
        getCapital(x, y) {
            if (this.hexAt(x, y) && this.hexAt(x, y).piece === "capital") {
                for (let i = 0; i < this._capitals.length; i++) {
                    const cap = this._capitals[i];
                    if (cap.x == x && cap.y == y)
                        return cap;
                }
            }
            return undefined;
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
                list.push({ hex: n0, x: x, y: y - 1 });
            if (n1)
                list.push({ hex: n1, x: x - 1, y: y });
            if (n2)
                list.push({ hex: n2, x: x + 1, y: y });
            if (n3)
                list.push({ hex: n3, x: x, y: y + 1 });
            if (n4)
                list.push({ hex: n4, x: x - 1, y: y + zig });
            if (n5)
                list.push({ hex: n5, x: x + 1, y: y + zig });
            return list;
        }
        findConnected(x, y) {
            let targetTeam = this.hexAt(x, y).team;
            let connected = [];
            let ignore = [];
            const sub = (sx, sy) => {
                let hex = this.hexAt(sx, sy);
                connected.push({ hex: hex, x: sx, y: sy });
                ignore.push(hex);
                let neis = this.neighbours(sx, sy);
                for (let i = 0; i < neis.length; i++) {
                    const nei = neis[i];
                    if ((nei.hex.team === targetTeam) && (ignore.indexOf(nei.hex) < 0))
                        sub(nei.x, nei.y);
                }
            };
            sub(x, y);
            return { hexes: connected, team: targetTeam };
        }
        findZones() {
            let found = [];
            let zones = [];
            for (let x = 0; x < this._width; x++) {
                for (let y = 0; y < this._height; y++) {
                    const hex = this.hexAt(x, y);
                    if (hex && found.indexOf(hex) < 0) {
                        let zone = this.findConnected(x, y);
                        found.push(...(zone.hexes.map((hexXY) => { return hexXY.hex; })));
                        zones.push(zone);
                    }
                }
            }
            return zones;
        }
        static zoneOf(zones, hex) {
            for (let i = 0; i < zones.length; i++) {
                const zone = zones[i];
                for (let j = 0; j < zone.hexes.length; j++)
                    if (hex === zone.hexes[j].hex)
                        return zone;
            }
            return undefined;
        }
        static profit(zone) {
            return 0;
        }
        onChange() {
            for (let i = 0; i < this.changeListeners.length; i++)
                this.changeListeners[i]();
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