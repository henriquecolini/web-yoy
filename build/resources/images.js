define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const images = {
        "capital": ["capital.png"],
        "forest": ["forest0.png", "forest1.png"]
    };
    const basePath = "src/images/";
    class Images {
        static piece(type) {
            let arr = images[type];
            if (!arr)
                return undefined;
            return basePath + ((arr.length == 1) ? arr[0] : (arr[Math.floor(Math.random() * arr.length)]));
        }
    }
    exports.default = Images;
});
//# sourceMappingURL=images.js.map