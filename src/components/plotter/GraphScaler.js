export class GraphScaler {

    canvas;
    graphOrigin;
    constructor(canvas, graphOrigin) {
        this.canvas = canvas;
        this.graphOrigin = graphOrigin;
    }

    scale = 1;
    scaleRatio = 1.1;
    inverseScaleRatio = 1 / this.scaleRatio;
    baseSegmentLength = 60;
    segmentLength = this.baseSegmentLength;
    segmentLengthX = this.baseSegmentLength;
    segmentLengthY = this.baseSegmentLength;
    numberSegmentStep = 1;
    decimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
    numberSegmentStepMultipliers = [1, 2, 5];
    numberSegmentStepMultiplierIndex = 0;
    numberSegmentStepMultiplierPow = 0;

    getSegmentLengthX() {
        this.segmentLengthX = this.getSegmentLength();
        return this.segmentLengthX;
    }

    getSegmentLengthY() {
        this.segmentLengthY = this.getSegmentLength();
        return this.segmentLengthY;
    }

    zoomInToCanvasPoint(x, y) {
        this.zoomRelativeToPointOnCanvas(x, y, this.scaleRatio);
        this.scale *= this.scaleRatio;
    }

    zoomOutFromCanvasPoint(x, y) {
        this.zoomRelativeToPointOnCanvas(x, y, this.inverseScaleRatio);
        this.scale /= this.scaleRatio;
    }

    zoomRelativeToPointOnCanvas(x, y, scaleRatio) {
        const zoomPointOffsetX = x - parseInt(this.canvas.style.width) / 2;
        const zoomPointOffsetY = y - parseInt(this.canvas.style.height) / 2;

        const newLocalOffsetX = this.graphOrigin.getOffsetX() * scaleRatio - zoomPointOffsetX * (scaleRatio - 1);
        const newLocalOffsetY = this.graphOrigin.getOffsetY() * scaleRatio - zoomPointOffsetY * (scaleRatio - 1);

        this.graphOrigin.setOffsetX(newLocalOffsetX);
        this.graphOrigin.setOffsetY(newLocalOffsetY);
    }

    getNumberSegmentStep() {
        return this.numberSegmentStep;
    }

    recalculateNumberSegmentStep() {
        const index = this.numberSegmentStepMultiplierIndex;
        const multipliers = this.numberSegmentStepMultipliers;
        const multiplier = multipliers[index];
        const pow = this.numberSegmentStepMultiplierPow;
        this.numberSegmentStep = multiplier * Math.pow(10, pow);
    }

    increaseNumberSegmentStep() {
        // [1, 2 ,5]
        const multipliers = this.numberSegmentStepMultipliers;
        this.numberSegmentStepMultiplierIndex += 1;
        if (this.numberSegmentStepMultiplierIndex > multipliers.length - 1) {
            this.numberSegmentStepMultiplierIndex = 0;
            this.numberSegmentStepMultiplierPow += 1;

        }
        this.recalculateNumberSegmentStep();
    }

    reduceNumberSegmentStep() {
        //[1, 2 ,5]
        const multipliers = this.numberSegmentStepMultipliers;
        this.numberSegmentStepMultiplierIndex -= 1;
        if (this.numberSegmentStepMultiplierIndex < 0) {
            this.numberSegmentStepMultiplierIndex = multipliers.length - 1;
            this.numberSegmentStepMultiplierPow -= 1;

        }
        this.recalculateNumberSegmentStep();
    }


    recalculateNumberSegmentLength() {
        this.segmentLength = this.scale * this.baseSegmentLength * this.numberSegmentStep;
        if (this.segmentLength > 100) {
            this.reduceNumberSegmentStep();
            this.recalculateNumberSegmentLength();
        } else if (this.segmentLength < 40) {
            this.increaseNumberSegmentStep();
            this.recalculateNumberSegmentLength();
        }
    }

    getSegmentLength() {
        this.recalculateNumberSegmentLength();
        return this.segmentLength;
    }

    getDecimalFormat() {
        return this.decimalFormat;
    }

    getScale() {
        return this.scale;
    }

    getScaleRatio() {
        return this.scaleRatio;
    }

}