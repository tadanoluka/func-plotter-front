export class GraphOrigin {
    canvasCordX = 0;
    canvasCordY = 0;
    offsetX = 0;
    offsetY = 0;

    canvas;
    constructor(canvas) {
        this.canvas = canvas;
    }

    updateCanvasXCord() {
        this.canvasCordX = parseInt(this.canvas.style.width) / 2 + this.offsetX;
    }

    updateCanvasYCord() {
        this.canvasCordY = parseInt(this.canvas.style.height) / 2 + this.offsetY;
    }

    getCanvasCordX() {
        this.updateCanvasXCord();
        return this.canvasCordX;
    }

    getCanvasCordY() {
        this.updateCanvasYCord();
        return this.canvasCordY;
    }

    addOffsetX(value) {
        this.offsetX += value;
    }

    addOffsetY(value) {
        this.offsetY += value;
    }

    getOffsetX() {
        return this.offsetX;
    }

    setOffsetX(offsetX) {
        this.offsetX = offsetX;
    }

    getOffsetY() {
        return this.offsetY;
    }

    setOffsetY(offsetY) {
        this.offsetY = offsetY;
    }
}
