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
        constructor(teamCount, worldWidth, worldHeight) {
            this._teams = [];
            this._width = worldWidth;
            this._height = worldHeight;
            this.changeListeners = [];
            for (let i = 0; i < teamCount; i++) {
                this._teams[i] = { color: exports.STD_COLOURS[i % exports.STD_COLOURS.length], money: 0, zones: [] };
            }
            this._world = [];
            for (let x = 0; x < worldWidth; x++) {
                for (let y = 0; y < worldHeight; y++) {
                    this._world[(worldWidth * y) + x] = { team: undefined, piece: undefined, pieceLevel: undefined };
                }
            }
        }
        hexAt(x, y) {
            return this._world[(this._width * y) + x];
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