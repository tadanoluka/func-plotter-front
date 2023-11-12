import styles from "@/components/plotter/splitPane.module.css";
import Canvas from "@/components/plotter/canvas";

export default function SplitPaneRightPane({rightPaneRef, dividerPercent, canvasRef, canvasContextRef, canvasWidth, canvasHeight}) {

    return (
        <div className={styles.splitRightPane}
             ref={rightPaneRef}
             style={{width:`${100 - dividerPercent}%`}}
        >
            <Canvas canvasRef={canvasRef} canvasContextRef={canvasContextRef} width={canvasWidth} height={canvasHeight}/>
        </div>
    );
}