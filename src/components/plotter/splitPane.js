import styles from "./splitPane.module.css";

import {useEffect, useRef, useState} from "react";
import Canvas from "./canvas"
import SplitPaneDivider from "@/components/plotter/splitPaneDivider";
import SplitPaneLeftPane from "@/components/plotter/splitPaneLeftPane";
import SplitPaneRightPane from "@/components/plotter/splitPaneRightPane";

export default function SplitPane({headerRef, footerRef}) {

    const splitPaneRef = useRef(null);
    const rightPaneRef = useRef(null);

    const canvasRef = useRef(null);
    const canvasContextRef = useRef(null);

    const [dividerPercent, setDividerPercent] = useState(30);
    const [isDividerDragging, setIsDividerDragging] = useState(false);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    function handleResize() {
        calcWidth();
        calcHeight();
    }

    function calcWidth() {
        // const width = window.innerWidth * ((100 - dividerPercent) / 100);
        const width = rightPaneRef.current.clientWidth;
        setCanvasWidth(width);
    }

    function calcHeight() {
        const height = window.innerHeight - headerRef.current.offsetHeight - footerRef.current.offsetHeight;
        setCanvasHeight(height);
    }

    useEffect(() => {
        calcHeight();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    useEffect(() => {
        calcWidth();
    }, [dividerPercent]);

    function startDragging() {
        setIsDividerDragging(true);
        splitPaneRef.current.style.cursor = "e-resize";
    }

    function dragging(nativeEvent) {
        if (isDividerDragging) {
            setDividerPercent(dividerPercent + nativeEvent.movementX / window.innerWidth * 100);
        }
    }

    function endDragging() {
        setIsDividerDragging(false);
        splitPaneRef.current.style.cursor = "default";
    }

    return (
        <div className={styles.splitPane} ref={splitPaneRef} onMouseUp={endDragging} onMouseLeave={endDragging} onMouseMove={dragging}>
            <SplitPaneLeftPane dividerPercent={dividerPercent} />
            <SplitPaneDivider startDragging={startDragging}/>
            <SplitPaneRightPane dividerPercent={dividerPercent}
                                rightPaneRef={rightPaneRef}
                                canvasRef={canvasRef}
                                canvasContextRef={canvasContextRef}
                                canvasWidth={canvasWidth}
                                canvasHeight={canvasHeight}/>
        </div>
    );
}