import classNames from "classnames";
import styles from "./tabBar.module.css";
import ColorTabPanel from "@/components/ColorTabPanel";

export default function TabBarPanels({currentTab}) {

    return (
        <>
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
                <ColorTabPanel />
                <ColorTabPanel />
                <ColorTabPanel />
                <ColorTabPanel />
            </div>
            <div className={currentTab === 3
                ? classNames(styles.tab, styles.activeTab, styles.settingsTab)
                : classNames(styles.tab, styles.hiddenTab)}
            >
                settings
            </div>
        </>
    );
}