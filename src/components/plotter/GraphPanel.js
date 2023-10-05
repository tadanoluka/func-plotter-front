import {useEffect, useRef} from "react";
import {GraphOrigin} from "@/components/plotter/GraphOrigin";
import {GraphScaler} from "@/components/plotter/GraphScaler";
import GraphCanvas from "@/components/plotter/GraphCanvas";
import {GraphAxes} from "@/components/plotter/GraphAxes";
import {GraphUtils} from "@/components/plotter/GraphUtils";
import {GraphGrid} from "@/components/plotter/GraphGrid";


export default function GraphPanel({ graphCanvasRef }) {
    const graphCanvasContextRef = useRef(null)

    const graphOriginRef = useRef(null);
    const graphScalerRef = useRef(null);
    const graphUtilsRef = useRef(null);
    const graphAxesRef = useRef(null);
    const graphGridRef = useRef(null);



    useEffect(() => {
        const graphOrigin = new GraphOrigin(graphCanvasRef.current);
        const graphScaler = new GraphScaler(graphCanvasRef.current, graphOrigin);
        const graphUtils = new GraphUtils(graphOrigin, graphScaler)
        const graphAxes = new GraphAxes(graphCanvasRef.current, graphOrigin, graphScaler, graphCanvasContextRef.current, graphUtils);
        const graphGrid = new GraphGrid(graphCanvasRef.current, graphCanvasContextRef.current, graphScaler, graphOrigin)

        graphOriginRef.current = graphOrigin;
        graphScalerRef.current = graphScaler;
        graphUtilsRef.current = graphUtils;
        graphAxesRef.current = graphAxes;
        graphGridRef.current = graphGrid;

        graphAxes.drawLines();
    }, []);

    return (
        <GraphCanvas canvasRef={graphCanvasRef}
                     canvasContextRef={graphCanvasContextRef}
                     graphOriginRef={graphOriginRef}
                     graphScalerRef={graphScalerRef}
                     graphAxesRef={graphAxesRef}
                     graphGridRef={graphGridRef}
        />
    )
}