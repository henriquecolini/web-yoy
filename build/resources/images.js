define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const images = {
        "capital": "capital.png",
        "forest": "forest0.png"
    };
    const loaded = {};
    const basePath = "src/images/";
    class LoadedImage {
        constructor(src) {
            this.alreadyLoaded = false;
            this._image = new Image();
            this._image.src = src;
            this.listeners = [];
            this._image.onload = () => {
                for (let i = 0; i < this.listeners.length; i++)
                    this.listeners[i]();
                this.alreadyLoaded = true;
            };
        }
        get image() {
            return this._image;
        }
        set onload(listener) {
            if (!this.alreadyLoaded) {
                this.listeners.push(listener);
            }
            else {
                listener();
            }
        }
    }
    exports.LoadedImage = LoadedImage;
    class Images {
        static piece(type) {
            if (!images[type])
                return undefined;
            let path = basePath + images[type];
            if (!loaded[type]) {
                loaded[type] = new LoadedImage(path);
            }
            return loaded[type];
        }
    }
    exports.default = Images;
});
//# sourceMappingURL=images.js.map