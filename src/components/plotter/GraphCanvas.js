import {useEffect, useReducer, useRef, useState} from "react";
// import {GraphOrigin} from "@/components/plotter/GraphOrigin";
// import {GraphScaler} from "@/components/plotter/GraphScaler";


export default function GraphCanvas({ canvasRef, canvasContextRef, graphOriginRef, graphScalerRef, graphAxesRef, graphGridRef}) {

    const [isDragging, setIsDragging] = useState(false);

    const [lastMouseX, setLastMouseX] = useState()
    const [lastMouseY, setLastMouseY] = useState()

    useEffect(() => {
        const canvas = canvasRef.current;

        function handleResize() {
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = (canvas.clientWidth) * 2;
            canvas.height = (canvas.clientHeight) * 2;

            const context = canvas.getContext("2d");
            context.scale(2,2);
            canvasContextRef.current = context;

            if (graphAxesRef.current != null) {
                update()
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    }, []);


    function startCanvasDragging({nativeEvent}) {
        setIsDragging(true)
        setLastMouseX(nativeEvent.x);
        setLastMouseY(nativeEvent.y);
    }

    function canvasDragging({nativeEvent}) {
        if (isDragging) {
            const offsetX = nativeEvent.x - lastMouseX;
            const offsetY = nativeEvent.y - lastMouseY;

            graphOriginRef.current.addOffsetX(offsetX);
            graphOriginRef.current.addOffsetY(offsetY);
            canvasContextRef.current.fillRect(1, 1, 1, 1)

            setLastMouseX(nativeEvent.x);
            setLastMouseY(nativeEvent.y);

            update();
        }
    }

    function endCanvasDragging() {
        setIsDragging(false)
    }

    function zoom(nativeEvent) {
        if (nativeEvent.deltaY < 0) {
            graphScalerRef.current.zoomInToCanvasPoint(nativeEvent.clientX, nativeEvent.clientY);
        } else {
            graphScalerRef.current.zoomOutFromCanvasPoint(nativeEvent.clientX, nativeEvent.clientY);
        }
        update();
    }

    function clearCanvas() {
        canvasContextRef.current.clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    }

    function update(){
        clearCanvas()

        graphGridRef.current.draw();
        graphAxesRef.current.draw();
    }


    return (
        <canvas
            onMouseDown={startCanvasDragging}
            onMouseMove={canvasDragging}
            onMouseUp={endCanvasDragging}
            onWheel={zoom}
            ref={canvasRef}
        />
    );

}