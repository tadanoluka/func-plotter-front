
export class GraphAxes {
    canvas;
    graphOrigin;
    graphScaler;
    graphUtils;
    graphicsContext;

    paint = "rgb(255 255 255 / 70%)";
    lineWidth = 2;
    fontSize = 12;
    font = `${this.fontSize}px 'Verdana', sans-serif`;

    constructor(canvas, graphOrigin, graphScaler, graphicsContext, graphUtils) {
        this.canvas = canvas;
        this.graphOrigin = graphOrigin;
        this.graphScaler = graphScaler;
        this.graphicsContext = graphicsContext;
        this.graphUtils = graphUtils;
    }

    getAxesLines() {
        const lines = [[]];
        // X Axis
        lines[0] = [0, this.graphOrigin.getCanvasCordY(), parseInt(this.canvas.style.width), this.graphOrigin.getCanvasCordY()];
        // Y Axis
        lines[1] = [this.graphOrigin.getCanvasCordX(), 0, this.graphOrigin.getCanvasCordX(), parseInt(this.canvas.style.height)];
        return lines;
    }

    drawLines() {
        const prevPaint = this.graphicsContext.strokeStyle;
        const prevLineWidth = this.graphicsContext.lineWidth;

        this.graphicsContext.strokeStyle = this.paint;
        this.graphicsContext.lineWidth = this.lineWidth;

        this.graphicsContext.beginPath();
        const linesCords = this.getAxesLines();
        for (let i = 0; i < linesCords.length; i++) {
            const lineCords = linesCords[i];
            // console.log(lineCords)
            this.graphicsContext.moveTo(parseInt(lineCords[0]), parseInt(lineCords[1]));
            this.graphicsContext.lineTo(parseInt(lineCords[2]), parseInt(lineCords[3]));
        }
        this.graphicsContext.stroke();

        this.graphicsContext.strokeStyle = prevPaint;
        this.graphicsContext.lineWidth = prevLineWidth;
    }

    getAxisXNumbers() {
        const numStep = this.graphScaler.getNumberSegmentStep();
        const segmentLength = this.graphScaler.getSegmentLengthX();

        let startX = this.graphOrigin.getCanvasCordX() % segmentLength;
        startX = startX < 0 ? startX + segmentLength : startX;

        let endX = Math.floor((parseInt(this.canvas.style.width) - startX) / segmentLength) * segmentLength + startX;

        startX -= segmentLength;
        endX += segmentLength;

        const startNum = this.graphUtils.getLocalXFromCanvasX(startX);
        const endNum = this.graphUtils.getLocalXFromCanvasX(endX);

        const xAxisNums = [];

        let numY = this.graphOrigin.getCanvasCordY();
        numY = Math.max(numY, 0);
        numY = Math.min(numY, parseInt(this.canvas.style.height));


        if (this.graphOrigin.getCanvasCordX() < 0) {
            // Case Only Positive Numbers
            let num = startNum;
            for (let x = startX; x < endX; x += segmentLength) {
                xAxisNums.push([num, x, numY]);
                num += numStep;
            }
        } else if (this.graphOrigin.getCanvasCordX() > parseInt(this.canvas.style.width)) {
            // Case Only Negative Numbers
            let num = endNum;
            for (let x = endX; x > startX; x -= segmentLength) {
                xAxisNums.push([num, x, numY]);
                num -= numStep;
            }
        } else {
            // Case Positive and Negative Numbers
            let num = numStep;
            for (let x = this.graphOrigin.getCanvasCordX() + segmentLength ; x < endX + segmentLength; x += segmentLength) {
                xAxisNums.push([num, x, numY]);
                num += numStep;
            }
            num = -numStep;
            for (let x = this.graphOrigin.getCanvasCordX() - segmentLength ; x > startX - segmentLength; x -= segmentLength) {
                xAxisNums.push([num, x, numY]);
                num -= numStep;
            }
        }
        return xAxisNums;
    }

    getAxisYNumbers() {
        const numStep = this.graphScaler.getNumberSegmentStep();
        const segmentLength = this.graphScaler.getSegmentLengthY();

        let startY = this.graphOrigin.getCanvasCordY() % segmentLength;
        startY = startY < 0 ? startY + segmentLength : startY;

        let endY = Math.floor((parseInt(this.canvas.style.height) - startY) / segmentLength) * segmentLength + startY;

        startY -= segmentLength;
        endY += segmentLength;

        const startNum = this.graphUtils.getLocalYFromCanvasY(startY);
        const endNum = this.graphUtils.getLocalYFromCanvasY(endY);

        const yAxisNums = [];

        let numX = this.graphOrigin.getCanvasCordX();
        numX = Math.max(numX, 0);
        numX = Math.min(numX, parseInt(this.canvas.style.width));

        if (this.graphOrigin.getCanvasCordY() < 0) {
            // Case Only Negative Numbers
            let num = startNum;
            for (let y = startY; y < endY; y += segmentLength) {
                yAxisNums.push([num, numX, y]);
                num -= numStep;
            }
        } else if (this.graphOrigin.getCanvasCordY() > parseInt(this.canvas.style.height)) {
            // Case Only Positive Numbers
            let num = endNum;
            for (let y = endY; y > startY; y -= segmentLength) {
                yAxisNums.push([num, numX, y]);
                num += numStep;
            }
        } else {
            // Case Only Positive + Negative Numbers
            let num = -numStep;
            for (let y = this.graphOrigin.getCanvasCordY() + segmentLength ; y <= endY; y += segmentLength) {
                yAxisNums.push([num, numX, y]);
                num -= numStep;
            }
            num = numStep;
            for (let y = this.graphOrigin.getCanvasCordY() - segmentLength ; y >= startY; y-= segmentLength) {
                yAxisNums.push([num, numX, y]);
                num += numStep;
            }
        }
        return yAxisNums;
    }

    drawNumbers() {
        this.drawAxisXNumbers();
        this.drawAxisYNumber();
    }

    drawAxisXNumbers() {
        const prevFont = this.graphicsContext.font;
        const prevFill = this.graphicsContext.fillStyle;
        const prevTextAlign = this.graphicsContext.textAlign;
        const prevVPos = this.graphicsContext.textBaseline;

        let vPos;
        const textAlignment = "center";

        if (this.graphOrigin.getCanvasCordY() > 12) {
            vPos = "bottom";
        } else {
            vPos = "top";
        }

        this.graphicsContext.font = this.font;
        this.graphicsContext.fillStyle = this.paint;
        this.graphicsContext.textAlign = textAlignment;
        this.graphicsContext.textBaseline = vPos;

        const xNumbers = this.getAxisXNumbers();
        const decimalFormat = this.graphScaler.getDecimalFormat();

        for (let i = 0; i < xNumbers.length; i++) {
            this.graphicsContext.fillText(decimalFormat.format(xNumbers[i][0]), xNumbers[i][1], xNumbers[i][2]);
        }

        this.graphicsContext.font = prevFont;
        this.graphicsContext.fillStyle = prevFill;
        this.graphicsContext.textAlign = prevTextAlign;
        this.graphicsContext.textBaseline = prevVPos;
    }

    drawAxisYNumber() {
        const prevFont = this.graphicsContext.font;
        const prevFill = this.graphicsContext.fillStyle;
        const prevTextAlign = this.graphicsContext.textAlign;
        const prevVPos = this.graphicsContext.textBaseline;

        const vPos = "center";
        let textAlignment;
        let offset = 2;

        if (this.graphOrigin.getCanvasCordX() < parseInt(this.canvas.style.width)) {
            textAlignment = "left";
        } else {
            textAlignment = "right";
            offset = -offset;
        }

        this.graphicsContext.font = this.font;
        this.graphicsContext.fillStyle = this.paint;
        this.graphicsContext.textAlign = textAlignment;
        this.graphicsContext.textBaseline = vPos;

        const yNumbers = this.getAxisYNumbers();
        const decimalFormat = this.graphScaler.getDecimalFormat();

        for (let i = 0; i < yNumbers.length; i++) {
            this.graphicsContext.fillText(decimalFormat.format(yNumbers[i][0]), yNumbers[i][1] + offset, yNumbers[i][2]);
        }

        this.graphicsContext.font = prevFont;
        this.graphicsContext.fillStyle = prevFill;
        this.graphicsContext.textAlign = prevTextAlign;
        this.graphicsContext.textBaseline = prevVPos;
    }

    draw() {
        this.drawNumbers();
        this.drawLines();
    }
}