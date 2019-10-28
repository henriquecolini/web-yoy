define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SCanvas = (function () {
        function SCanvas(canvas) {
            var _this = this;
            this.draw = function () {
                _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                _this.ctx.fillStyle = "red";
                _this.ctx.fillRect(30, 30, 30, 30);
            };
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        }
        return SCanvas;
    }());
    exports["default"] = SCanvas;
});
//# sourceMappingURL=scanvas.js.map