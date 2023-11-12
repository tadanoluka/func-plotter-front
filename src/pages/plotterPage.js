
import styles from "./plotter.module.css";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SettingsIcon from '@mui/icons-material/Settings';
import {GraphOrigin} from "@/components/plotter1/GraphOrigin";
import {GraphScaler} from "@/components/plotter1/GraphScaler";
import {GraphUtils} from "@/components/plotter1/GraphUtils";
import {GraphAxes} from "@/components/plotter1/GraphAxes";
import {GraphGrid} from "@/components/plotter1/GraphGrid";
import GraphCanvas from "@/components/plotter1/GraphCanvas";
import ColorTabPanel from "@/components/ColorTabPanel";
import {IconButton} from "@mui/material";
import {GraphSubgrid} from "@/components/plotter1/GraphSubgrid";


export default function PlotterPage() {
    const [init, setInit] = useState(false);

    const graphCanvasComponentRef = useRef(null);
    const graphCanvasRef = useRef(null);
    const graphCanvasContextRef = useRef(null)
    const graphOriginRef = useRef(null);
    const graphScalerRef = useRef(null);
    const graphUtilsRef = useRef(null);
    const graphAxesRef = useRef(null);
    const graphGridRef = useRef(null);
    const graphSubgridRef = useRef(null);

    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)

    const [dividerPercent, setDividerPercent] = useState(20);
    const [isDragging, setIsDragging] = useState(false);

    const [windowWidth, setWindowWidth] = useState(0);

    const centerRef = useRef(null);
    const pageRef = useRef(null);
    const rightPaneRef = useRef(null);

    const [currentTab, setCurrentTab] = useState(1);

    const [xUnderMouse, setXUnderMouse] = useState(0);
    const [yUnderMouse, setYUnderMouse] = useState(0);

    const [scale, setScale] = useState(1);
    const [scaleRatio, setScaleRatio] = useState(1.1);

    const [t, setT] = useState(0);

    function forceUpdate() {
        setT(t + 1);
    }

    function toggleTab(index) {
        setCurrentTab(index);
    }

    function handleResize() {
        setWindowWidth(window.innerWidth - 50);
        if (!centerRef.current) {
            return
        }
        centerRef.current.style.height = `${window.innerHeight - 60}px`

        setCanvasWidth(graphCanvasRef.current.clientWidth * 2);
        setCanvasHeight(graphCanvasRef.current.clientHeight * 2);
    }


    useEffect(() => {
        if (!graphOriginRef || !graphOriginRef.current) {
            const graphOrigin = new GraphOrigin(graphCanvasRef.current);
            const graphScaler = new GraphScaler(graphCanvasRef.current, graphOrigin);
            const graphUtils = new GraphUtils(graphOrigin, graphScaler);
            const graphAxes = new GraphAxes(graphCanvasRef.current, graphOrigin, graphScaler, graphCanvasContextRef.current, graphUtils);
            const graphGrid = new GraphGrid(graphCanvasRef.current, graphCanvasContextRef.current, graphScaler, graphOrigin);
            const graphSubgrid = new GraphSubgrid(graphCanvasRef.current, graphCanvasContextRef.current, graphScaler, graphOrigin);

            graphOriginRef.current = graphOrigin;
            graphScalerRef.current = graphScaler;
            graphUtilsRef.current = graphUtils;
            graphAxesRef.current = graphAxes;
            graphGridRef.current = graphGrid;
            graphSubgridRef.current = graphSubgrid;
            handleResize()
            window.addEventListener('resize', handleResize)
        }
    }, []);

    function startDragging() {
        setIsDragging(true);
        pageRef.current.style.cursor = "e-resize";
    }

    function dragging(nativeEvent) {
        if (isDragging) {
            setDividerPercent(dividerPercent + nativeEvent.movementX / windowWidth * 100);
            setCanvasWidth(graphCanvasRef.current.clientWidth * 2);
        }
    }

    function endDragging() {
        setIsDragging(false);
        pageRef.current.style.cursor = "default";
    }

    function updateCordsLabel({nativeEvent}) {
        if (graphScalerRef.current == null) {
            return
        }
        const rect = nativeEvent.target.getBoundingClientRect();
        const x = nativeEvent.clientX - rect.left;
        const y = nativeEvent.clientY - rect.top;
        const formater = graphScalerRef.current.getDecimalFormat();
        setXUnderMouse(formater.format(graphUtilsRef.current.getLocalXFromCanvasX(x)));
        setYUnderMouse(formater.format(graphUtilsRef.current.getLocalYFromCanvasY(y)));
    }

    function updateScaleLabel({nativeEvent}) {
        if (graphScalerRef.current == null) {
            return
        }
        const formater = graphScalerRef.current.getDecimalFormat();
        setScale(formater.format(graphScalerRef.current.getScale()));
        setScaleRatio(formater.format(graphScalerRef.current.getScaleRatio()));
    }

    return (
        <div className={styles.pageView}
             ref={pageRef}
             onMouseLeave={endDragging}
        >
            <header className={styles.header}>

            </header>
            <div className={styles.center}
                 onMouseUp={endDragging}
                 onMouseMove={dragging}
                 ref={centerRef}
            >
                <div className={styles.tabBar}>
                    <IconButton
                        className={styles.tabIconButton}
                        aria-label="plotter tab"
                        onClick={() => toggleTab(1)}
                    >
                        <ShowChartIcon
                            className={styles.tabButtonIcon}
                        />
                    </IconButton>

                    <IconButton
                        className={styles.tabIconButton}
                        aria-label="color tab"
                        onClick={() => toggleTab(2)}
                    >
                        <ColorLensIcon
                            className={styles.tabButtonIcon}
                        />
                    </IconButton>
                    <IconButton
                        className={styles.tabIconButton}
                        aria-label="settings tab"
                        onClick={() => toggleTab(3)}
                    >
                        <SettingsIcon
                            className={styles.tabButtonIcon}
                        />
                    </IconButton>
                </div>
                <div className={styles.splitPane}>
                    <div className={styles.splitLeftPane}
                         style={{width:`${dividerPercent}%`}}
                    >
                        <div className={currentTab === 1
                            ? classNames(styles.tab, styles.activeTab, styles.plotTab)
                            : classNames(styles.tab, styles.hiddenTab)}
                        >
                            PLOTTER
                        </div>
                        <div className={currentTab === 2
                            ? classNames(styles.tab, styles.activeTab, styles.colorTab)
                            : classNames(styles.tab, styles.hiddenTab)}
                        >
                            <ColorTabPanel plotterComponentRef={graphGridRef} forceUpdate={forceUpdate}/>
                            <ColorTabPanel plotterComponentRef={graphSubgridRef} />
                            <ColorTabPanel />
                            <ColorTabPanel />
                        </div>
                        <div className={currentTab === 3
                            ? classNames(styles.tab, styles.activeTab, styles.settingsTab)
                            : classNames(styles.tab, styles.hiddenTab)}
                        >
                            settings
                        </div>
                    </div>
                    <div className={styles.splitPaneDivider}
                         onMouseDown={startDragging}
                    />
                    <div className={styles.splitRightPane}
                         style={{width:`${100 - dividerPercent}%`}}
                         ref={rightPaneRef}
                         onMouseMove={updateCordsLabel}
                         onWheel={updateScaleLabel}
                    >
                        <GraphCanvas canvasRef={graphCanvasRef}
                                     canvasWidth={canvasWidth}
                                     canvasHeight={canvasHeight}
                                     canvasContextRef={graphCanvasContextRef}
                                     graphOriginRef={graphOriginRef}
                                     graphScalerRef={graphScalerRef}
                                     graphAxesRef={graphAxesRef}
                                     graphGridRef={graphGridRef}
                                     graphSubgridRef={graphSubgridRef}
                        />
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    <div>X: {xUnderMouse}</div>
                    <div>Y: {yUnderMouse}</div>
                </div>
                <div className={styles.footerRight}>
                    <div>Scale: {scale}</div>
                    <div>Scale Ratio: {scaleRatio}</div>
                </div>
            </footer>
        </div>

    );
}