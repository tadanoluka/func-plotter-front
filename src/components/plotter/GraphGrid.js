export class GraphGrid {
    canvas;
    graphicsContext;
    graphScaler;
    graphOrigin;

    color = "rgb(255 255 255 / 20%)";
    lineTypes = ["Solid", "Dashed"];
    lineTypeIndex = 1;
    lineWidth = 1;
    dashLength = 4;
    dashInterval = 3;


    constructor(canvas, graphicsContext, graphScaler, graphOrigin) {
        this.canvas = canvas;
        this.graphicsContext = graphicsContext;
        this.graphScaler = graphScaler;
        this.graphOrigin = graphOrigin;

    }


    getHorizontalLines() {
        let cordY = this.graphOrigin.getCanvasCordY() % this.graphScaler.getSegmentLengthY();
        if (cordY < 0) {
            cordY += this.graphScaler.getSegmentLengthY();
        }
        const amount =  ((parseInt(this.canvas.style.height) - cordY) / this.graphScaler.getSegmentLengthY()) + 1;
        const lines = [];
        for (let i = 0; i < amount; i++) {
            lines[i] = [0, cordY, parseInt(this.canvas.style.width), cordY];
            cordY += this.graphScaler.getSegmentLengthY();
        }
        return lines;
    }

    getVerticalLines() {
        let cordX = this.graphOrigin.getCanvasCordX() % this.graphScaler.getSegmentLengthX();
        if (cordX < 0) {
            cordX += this.graphScaler.getSegmentLengthX();
        }
        const amount = ((parseInt(this.canvas.style.width) - cordX) / this.graphScaler.getSegmentLengthX()) + 1;
        const lines = [];
        for (let i = 0; i < amount; i++) {
            lines[i] = [cordX, 0, cordX, parseInt(this.canvas.style.height)];
            cordX += this.graphScaler.getSegmentLengthX();
        }
        return lines;
    }

    getLines() {
        const vLines = this.getVerticalLines();
        const hLines = this.getHorizontalLines();
        return [...vLines, ...hLines];
    }

    draw() {
        const prevPaint = this.graphicsContext.strokeStyle;
        const prevLineDashes = this.graphicsContext.getLineDash();
        const prevLineWidth = this.graphicsContext.lineWidth;

        this.graphicsContext.strokeStyle = this.color;
        switch (this.lineTypeIndex) {
            case 0: {
                this.graphicsContext.setLineDash();
                break;
            }
            default: {
                this.graphicsContext.setLineDash([this.dashLength, this.dashInterval]);
            }
        }

        this.graphicsContext.lineWidth = this.lineWidth;
        this.graphicsContext.beginPath();
        const lines = this.getLines();
        for (let i = 0; i < lines.length; i++) {
            this.graphicsContext.moveTo(lines[i][0], lines[i][1]);
            this.graphicsContext.lineTo(lines[i][2], lines[i][3]);
        }
        this.graphicsContext.stroke();

        this.graphicsContext.strokeStyle = prevPaint;
        this.graphicsContext.setLineDash(prevLineDashes);
        this.graphicsContext.lineWidth = prevLineWidth;
    }

    getLineTypes() {
        return this.lineTypes;
    }

    getLineTypeIndex() {
        return this.lineTypeIndex;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    setLineTypeIndex(lineTypeIndex) {
        this.lineTypeIndex = lineTypeIndex;
    }

    getLineWidth() {
        return this.lineWidth;
    }

    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
    }

    getDashLength() {
        return this.dashLength;
    }

    setDashLength(dashLength) {
        this.dashLength = dashLength;
    }

    getDashInterval() {
        return this.dashInterval;
    }

    setDashInterval(dashInterval) {
        this.dashInterval = dashInterval;
    }
}