import {useCallback, useEffect, useReducer, useRef, useState} from "react";
// import {GraphOrigin} from "@/components/plotter/GraphOrigin";
// import {GraphScaler} from "@/components/plotter/GraphScaler";


export default function GraphCanvas({ graphCanvasComponentRef, canvasHeight ,canvasWidth, canvasRef, canvasContextRef, graphOriginRef, graphScalerRef, graphAxesRef, graphGridRef, graphSubgridRef}) {

    const [isDragging, setIsDragging] = useState(false);

    const [temp, setTemp] = useState(0);



    function forceUpdate() {
        setTemp(temp + 1);
    }

    function handleResize() {
        if (canvasRef.current == null) {
            return
        }
        const canvas = canvasRef.current;
        canvas.width = (canvas.clientWidth) * 2;
        canvas.height = (canvas.clientHeight) * 2;

        const context = canvas.getContext("2d");
        context.scale(2,2);
        canvasContextRef.current = context;

        if (graphAxesRef.current != null) {
            update()
        }
    }

    useEffect(() => {
        graphCanvasComponentRef.current = this;
        console.log(this)
        handleResize()
    }, []);

    useEffect(() => {
        handleResize()
    }, [canvasWidth]);
    useEffect(() => {
        handleResize()
    }, [canvasHeight]);


    function startCanvasDragging({nativeEvent}) {
        setIsDragging(true)
    }

    function canvasDragging({nativeEvent}) {
        if (isDragging) {
            graphOriginRef.current.addOffsetX(nativeEvent.movementX);
            graphOriginRef.current.addOffsetY(nativeEvent.movementY);

            update();
        }
    }

    function endCanvasDragging() {
        setIsDragging(false)
    }

    function zoom({nativeEvent}) {
        const rect = nativeEvent.target.getBoundingClientRect();
        const x = nativeEvent.clientX - rect.left;
        const y = nativeEvent.clientY - rect.top;
        if (nativeEvent.deltaY < 0) {
            graphScalerRef.current.zoomInToCanvasPoint(x, y);
        } else {
            graphScalerRef.current.zoomOutFromCanvasPoint(x, y);
        }
        update();
    }

    function clearCanvas() {
        canvasContextRef.current.clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    }

    function update(){
        clearCanvas();

        graphSubgridRef.current.draw();
        graphGridRef.current.draw();
        graphAxesRef.current.draw();
    }


    return (
        <canvas
            onMouseDown={startCanvasDragging}
            onMouseMove={canvasDragging}
            onMouseUp={endCanvasDragging}
            onMouseLeave={endCanvasDragging}
            onWheel={zoom}
            style={{width: "100%",
                    height: "100%"}}
            ref={canvasRef}
        />
    );

}