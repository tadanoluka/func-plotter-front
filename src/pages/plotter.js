import styles from "@/components/plotter/plotter.module.css";

import classNames from "classnames";

import ColorTabPanel from "@/components/ColorTabPanel";
import Header from "@/components/plotter/header";
import TabBarMenu from "@/components/plotter/tabBarMenu";
import SplitPane from "@/components/plotter/splitPane";
import Footer from "@/components/plotter/footer";
import {useRef} from "react";

export default function Plotter() {
    const headerRef = useRef(null);
    const footerRef = useRef(null);

    return (
        <div className={styles.pageView}>
            <Header headerRef={headerRef}/>
            <SplitPane headerRef={headerRef} footerRef={footerRef}/>
            <Footer footerRef={footerRef}/>
        </div>

    );
}