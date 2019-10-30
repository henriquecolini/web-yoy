define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const LEVELS = {
        medium: [
            {
                teams: [
                    { zones: [{ money: 10, name: "City A1" }, { money: 10, name: "City A2" }] },
                    { zones: [{ money: 10, name: "City B1" }, { money: 10, name: "City B2" }] },
                ],
                pieces: [],
                width: 12,
                map: ". . . . 0 0$0 0 0 . . . ." +
                    ". . . # 0 0 0 0 # . . ." +
                    ". . # # # # # # # # . ." +
                    ". 1 # # # # # # # # 1 ." +
                    "1 1 # # # # . # # # 1 1" +
                    "1$0 1 # # . . . # # # 1 1$1" +
                    "1 1 # # # # . # # # 1 1" +
                    ". 1 # # # # # # # # 1 ." +
                    ". . # # # # # # # # . ." +
                    ". . . # 0 0 0 0 # . . ." +
                    ". . . . 0 0 0$1 0 . . . ."
            }
        ]
    };
    exports.default = LEVELS;
});
//# sourceMappingURL=levels.js.map