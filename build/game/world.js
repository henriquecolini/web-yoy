define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EMPTY_COLOUR = "#616161";
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
            this._width = level.width;
            this._teams = [];
            for (let i = 0; i < level.teams.length; i++) {
                const t = level.teams[i];
                this._teams[i] = { color: exports.STD_COLOURS[i % exports.STD_COLOURS.length], zones: [] };
                for (let j = 0; j < t.zones.length; j++) {
                    const z = t.zones[j];
                    this._teams[i].zones[i] = { hexes: [], money: z.money, name: z.name };
                }
            }
            let strMap = level.map.split(" ");
        }
        hexAt(x, y) {
            return this._world[x][y];
        }
        neighbours(x, y) {
            let list = [];
            let n1 = this.hexAt(x, y - 1);
            let n2 = this.hexAt(x - 1, y);
            let n3 = this.hexAt(x + 1, y);
            let n4 = this.hexAt(x, y + 1);
            let n5 = this.hexAt(x - 1, y + 1);
            let n6 = this.hexAt(x + 1, y + 1);
            if (n1)
                list.push(n1);
            if (n2)
                list.push(n2);
            if (n3)
                list.push(n3);
            if (n4)
                list.push(n4);
            if (n5)
                list.push(n5);
            if (n6)
                list.push(n6);
            return list;
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
    }
    exports.default = World;
});
//# sourceMappingURL=world.js.map