
import styles from "./plotter.module.css";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SettingsIcon from '@mui/icons-material/Settings';
import GraphPanel from "@/components/plotter/GraphPanel";


export default function PlotterPage() {
    const graphCanvasCompRef = useRef();
    const graphCanvasRef = useRef(null);

    const [dividerPercent, setDividerPercent] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const [windowWidth, setWindowWidth] = useState(0);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    const centerRef = useRef(null);
    const pageRef = useRef(null);
    const rightPaneRef = useRef(null);

    const [currentTab, setCurrentTab] = useState(1)

    function toggleTab(index) {
        setCurrentTab(index);
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth - 50);
            centerRef.current.style.height = `${window.innerHeight - 60}px`
        }

        handleResize()
        window.addEventListener('resize', handleResize)
    }, []);

    function startDragging() {
        setIsDragging(true);
        pageRef.current.style.cursor = "e-resize";
    }

    function dragging(nativeEvent) {
        if (isDragging) {
            setDividerPercent(dividerPercent + nativeEvent.movementX / windowWidth * 100);
        }
    }

    function endDragging() {
        setIsDragging(false);
        pageRef.current.style.cursor = "default";
    }

    return (
        <div className={styles.pageView}
             ref={pageRef}
        >
            <header className={styles.header}>

            </header>
            <div className={styles.center}
                 onMouseUp={endDragging}
                 onMouseMove={dragging}
                 ref={centerRef}
            >
                <div className={styles.tabBar}>
                    <div className={styles.tabButton}>
                        <ShowChartIcon
                            onClick={() => toggleTab(1)}
                            className={styles.tabButtonIcon}
                        />
                    </div>
                    <div className={styles.tabButton}>
                        <ColorLensIcon
                            onClick={() => toggleTab(2)}
                            className={styles.tabButtonIcon}
                        />
                    </div>
                    <div className={styles.tabButton}>
                        <SettingsIcon
                            onClick={() => toggleTab(3)}
                            className={styles.tabButtonIcon}
                        />
                    </div>
                </div>
                <div className={styles.splitPane}>
                    <div className={styles.splitLeftPane}
                         style={{width:`${dividerPercent}%`}}
                    >
                        <div className={currentTab === 1
                            ? classNames(styles.tab, styles.activeTab, styles.plotTab)
                            : classNames(styles.tab, styles.plotTab)}
                        >
                            PLOTTER
                        </div>
                        <div className={currentTab === 2
                            ? classNames(styles.tab, styles.activeTab, styles.colorTab)
                            : classNames(styles.tab, styles.colorTab)}
                        >
                            <div className={styles.tempForm} />
                            <div className={styles.tempForm} />
                            <div className={styles.tempForm} />
                            <div className={styles.tempForm} />
                            <div className={styles.tempForm} />
                            <div className={styles.tempForm} />
                        </div>
                        <div className={currentTab === 3
                            ? classNames(styles.tab, styles.activeTab, styles.settingsTab)
                            : classNames(styles.tab, styles.settingsTab)}
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
                    >
                        <GraphPanel
                            graphCanvasRef={graphCanvasRef}
                        />
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>

            </footer>
        </div>

    );
}