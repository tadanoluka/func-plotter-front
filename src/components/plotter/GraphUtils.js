export class GraphUtils {
    graphOrigin;
    graphScaler;

    constructor(graphOrigin, graphScaler) {
        this.graphOrigin = graphOrigin;
        this.graphScaler = graphScaler;
    }

    getLocalXFromCanvasX(canvasCordX) {
        return (-this.graphOrigin.getCanvasCordX() + canvasCordX) / this.graphScaler.getSegmentLengthX() * this.graphScaler.getNumberSegmentStep();
    }

    getLocalYFromCanvasY(canvasCordY) {
        return (this.graphOrigin.getCanvasCordY() - canvasCordY) / this.graphScaler.getSegmentLengthY() * this.graphScaler.getNumberSegmentStep();
    }
}