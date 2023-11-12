export class GraphGrid {
    canvas;
    graphicsContext;
    graphScaler;
    graphOrigin;

    name = "Grid"

    visible = true;
    color = "rgb(255 255 255 / 20%)";
    lineTypes = ["Solid", "Dashed"];
    lineTypeIndex = 1;
    lineWidth = 1;
    dashLength = 4;
    dashInterval = 3;

    step = 1;


    constructor(canvas, graphicsContext, graphScaler, graphOrigin) {
        this.canvas = canvas;
        this.graphicsContext = graphicsContext;
        this.graphScaler = graphScaler;
        this.graphOrigin = graphOrigin;

    }


    getHorizontalLines() {
        const segmentLength = this.graphScaler.getSegmentLengthY() / this.step;
        let cordY = this.graphOrigin.getCanvasCordY() % segmentLength;
        if (cordY < 0) {
            cordY += segmentLength;
        }
        const amount =  ((this.canvas.clientHeight - cordY) / segmentLength) + 1;
        const lines = [];
        for (let i = 0; i < amount; i++) {
            lines[i] = [0, cordY, this.canvas.clientWidth, cordY];
            cordY += segmentLength;
        }
        return lines;
    }

    getVerticalLines() {
        const segmentLength = this.graphScaler.getSegmentLengthX() / this.step;
        let cordX = this.graphOrigin.getCanvasCordX() % segmentLength;
        if (cordX < 0) {
            cordX += segmentLength;
        }
        const amount = ((this.canvas.clientWidth - cordX) / segmentLength) + 1;
        const lines = [];
        for (let i = 0; i < amount; i++) {
            lines[i] = [cordX, 0, cordX, this.canvas.clientHeight];
            cordX += segmentLength;
        }
        return lines;
    }

    getLines() {
        const vLines = this.getVerticalLines();
        const hLines = this.getHorizontalLines();
        return [...vLines, ...hLines];
    }

    draw() {
        if (!this.visible) {
            return
        }
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
            this.graphicsContext.moveTo(Math.floor(lines[i][0]), Math.floor(lines[i][1]));
            this.graphicsContext.lineTo(Math.floor(lines[i][2]), Math.floor(lines[i][3]));
        }
        this.graphicsContext.stroke();

        this.graphicsContext.strokeStyle = prevPaint;
        this.graphicsContext.setLineDash(prevLineDashes);
        this.graphicsContext.lineWidth = prevLineWidth;
    }

    getParams() {
        return {
            mainParams: {
                name: this.name,
                setVisible: boolean => this.setVisible(boolean),
                getVisible: () => this.getVisible()
            },
            parameters: [
                {
                    name: "Line width",
                    type: "slider",
                    setter: value => this.setLineWidth(value),
                    getter: () => this.getLineWidth()
                },
                {
                    name: "Dash Length",
                    type: "slider",
                    setter: value => this.setDashLength(value),
                    getter: () => this.getDashLength()
                }
            ]
        }
    }

    setVisible(boolean) {
        this.visible = boolean;
    }

    getVisible() {
        return this.visible;
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