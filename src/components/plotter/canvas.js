import {useEffect, useState} from "react";
import styles from "./canvas.module.css"

export default function canvas({canvasRef, canvasContextRef, width, height}) {
    const [isDragging, setIsDragging] = useState(false);

    // Graph Origin
    const [graphOriginX, setGraphOriginX] = useState(0);
    const [graphOriginY, setGraphOriginY] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const updateOriginX = () => {setGraphOriginX(width / 2 + offsetX);}
    const updateOriginY = () => {setGraphOriginY(height / 2 + offsetY);}

    // Graph Scaler
    const [scale, setScale] = useState(1);
    const [scaleRatio, setScaleRatio] = useState(1.1);
    const [inverseScaleRatio, setInverseScaleRatio] = useState(1 / scaleRatio);
    const baseSegmentLength = 60;
    const [segmentLengthX, setSegmentLengthX] = useState(baseSegmentLength);
    const [segmentLengthY, setSegmentLengthY] = useState(baseSegmentLength);
    const decimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
    const [numberSegmentStep, setNumberSegmentStep] = useState(1);
    const numberSegmentStepMultipliers = [1, 2, 5];
    let numberSegmentStepMultiplierIndex = 0;
    let numberSegmentStepMultiplierPow = 0;

    // Graph Grid
    const [gridVisible, setGridVisible] = useState(true);
    const [gridColor, setGridColor] = useState("rgb(255 255 255 / 20%)");
    const lineTypes = ["Solid", "Dashed"];
    const [gridLineTypeIndex, setGridLineTypeIndex] = useState(1);
    const [gridLineWidth, setGridLineWidth] = useState(1);
    const [gridDashLength, setGridDashLength] = useState(4);
    const [gridDashInterval, setGridDashInterval] = useState(3);
    const gridStep = 1;

    // Graph Axes
    const [axesColor, setAxesColor] = useState("rgb(255 255 255 / 70%)");
    const [axesLineWidth, setAxesLineWidth] = useState(2);
    const fontSize = 12;
    const font = `${fontSize}px 'Verdana', sans-serif`;

    useEffect(() => {
        canvasContextRef.current = canvasRef.current.getContext("2d");
    }, [canvasContextRef]);
    useEffect( () => {
        canvasRef.current.height = height;
        canvasRef.current.style.height = `${height}px`;
        updateOriginY();
    }, [height])
    useEffect( () => {
        canvasRef.current.width = width;
        canvasRef.current.style.width = `${width}px`;
        updateOriginX();
    }, [width])
    useEffect(() => {
        updateDraw();
    }, [graphOriginY, graphOriginX]);
    useEffect(() => {
        updateOriginX();
        updateOriginY();
    }, [offsetX, offsetY]);

    function updateDraw() {
        canvasContextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
        canvasContextRef.current.fillRect(graphOriginX-2, graphOriginY-2, 4, 4);
        drawGrid(gridStep);
        drawAxesLines();
    }

    function drawGrid(step) {
        if (!gridVisible) {
            return
        }
        const graphicsContext = canvasContextRef.current;
        const prevPaint = graphicsContext.strokeStyle;
        const prevLineDashes = graphicsContext.getLineDash();
        const prevLineWidth = graphicsContext.lineWidth;

        graphicsContext.strokeStyle = gridColor;
        switch (gridLineTypeIndex) {
            case 0: {
                graphicsContext.setLineDash();
                break;
            }
            default: {
                graphicsContext.setLineDash([gridDashLength, gridDashInterval]);
            }
        }

        graphicsContext.lineWidth = gridLineWidth;

        graphicsContext.beginPath();

        const gridSegmentLengthY = segmentLengthY / step;
        let cordY = graphOriginY % gridSegmentLengthY;
        if (cordY < 0) {
            cordY += gridSegmentLengthY;
        }
        const amountY =  ((canvasRef.current.clientHeight - cordY) / gridSegmentLengthY) + 1;
        for (let i = 0; i < amountY; i++) {
            graphicsContext.moveTo(0, Math.floor(cordY));
            graphicsContext.lineTo(canvasRef.current.clientWidth, Math.floor(cordY));
            cordY += gridSegmentLengthY;
        }

        const gridSegmentLengthX = segmentLengthX / step;
        let cordX = graphOriginX % gridSegmentLengthX;
        if (cordX < 0) {
            cordX += gridSegmentLengthX;
        }
        const amountX = ((canvasRef.current.clientWidth - cordX) / gridSegmentLengthX) + 1;
        for (let i = 0; i < amountX; i++) {
            graphicsContext.moveTo(Math.floor(cordX), 0);
            graphicsContext.lineTo(Math.floor(cordX), canvasRef.current.clientHeight);
            cordX += gridSegmentLengthX;
        }

        graphicsContext.stroke();

        graphicsContext.strokeStyle = prevPaint;
        graphicsContext.setLineDash(prevLineDashes);
        graphicsContext.lineWidth = prevLineWidth;
    }

    function drawAxesLines() {
        const graphicsContext = canvasContextRef.current;
        const prevPaint = graphicsContext.strokeStyle;
        const prevLineWidth = graphicsContext.lineWidth;

        graphicsContext.strokeStyle = axesColor;
        graphicsContext.lineWidth = axesLineWidth;

        graphicsContext.beginPath();

        // X Axis
        graphicsContext.moveTo(0, graphOriginY);
        graphicsContext.lineTo(canvasRef.current.width, graphOriginY);

        // Y Axis
        graphicsContext.moveTo(graphOriginX, 0);
        graphicsContext.lineTo(graphOriginX, canvasRef.current.height);

        graphicsContext.stroke();

        graphicsContext.strokeStyle = prevPaint;
        graphicsContext.lineWidth = prevLineWidth;
    }
    function startDragging() {
        setIsDragging(true);
        canvasRef.current.style.cursor = "move";
    }

    function dragging(nativeEvent) {
        if (isDragging) {
            setOffsetX(offsetX + nativeEvent.movementX);
            setOffsetY(offsetY + nativeEvent.movementY);
        }
    }

    function endDragging() {
        setIsDragging(false);
        canvasRef.current.style.cursor = "default";
    }

    function zoom({nativeEvent}) {
        const rect = nativeEvent.target.getBoundingClientRect();
        const x = nativeEvent.clientX - rect.left;
        const y = nativeEvent.clientY - rect.top;
        let newScale;
        if (nativeEvent.deltaY < 0) {
            newScale = scale * scaleRatio;
            zoomRelativeToPointOnCanvas(x, y, scaleRatio, newScale);
        } else {
            newScale = scale / scaleRatio;
            zoomRelativeToPointOnCanvas(x, y, inverseScaleRatio, newScale);
        }
    }

    function zoomRelativeToPointOnCanvas(x, y, scaleRatio, newScale) {
        const zoomPointOffsetX = x - canvasRef.current.clientWidth / 2;
        const zoomPointOffsetY = y - canvasRef.current.clientHeight / 2;

        const newLocalOffsetX = offsetX * scaleRatio - zoomPointOffsetX * (scaleRatio - 1);
        const newLocalOffsetY = offsetY * scaleRatio - zoomPointOffsetY * (scaleRatio - 1);

        setScale(newScale);
        recalculateNumberSegmentLength();

        setOffsetX(newLocalOffsetX);
        setOffsetY(newLocalOffsetY);
    }

    function recalculateNumberSegmentLength() {
        const segmentLength = scale * baseSegmentLength * numberSegmentStep;
        if (segmentLength > 100) {
            reduceNumberSegmentStep();
        } else if (segmentLength < 40) {
            increaseNumberSegmentStep();
        } else {
            setSegmentLengthX(segmentLength);
            setSegmentLengthY(segmentLength);
        }
    }

    function increaseNumberSegmentStep() {
        const multipliers = numberSegmentStepMultipliers;
        numberSegmentStepMultiplierIndex += 1;
        if (numberSegmentStepMultiplierIndex > multipliers.length - 1) {
            numberSegmentStepMultiplierIndex = 0;
            numberSegmentStepMultiplierPow += 1;
        }
        recalculateNumberSegmentStep();
    }

    function reduceNumberSegmentStep() {
        const multipliers = numberSegmentStepMultipliers;
        numberSegmentStepMultiplierIndex -= 1;
        if (numberSegmentStepMultiplierIndex < 0) {
            numberSegmentStepMultiplierIndex = multipliers.length - 1;
            numberSegmentStepMultiplierPow -= 1;
        }
        recalculateNumberSegmentStep();
    }

    function recalculateNumberSegmentStep() {
        const multiplier = numberSegmentStepMultipliers[numberSegmentStepMultiplierIndex];
        setNumberSegmentStep(multiplier * Math.pow(10, numberSegmentStepMultiplierPow));
    }

    return (
        <canvas className={styles.canvas}
                ref={canvasRef}
                onMouseDown={startDragging}
                onMouseMove={dragging}
                onMouseUp={endDragging}
                onMouseLeave={endDragging}
                onWheel={zoom}
        >
            no support ЫыЫ((((((((
        </canvas>
    )
}