import styles from "@/components/plotter/splitPane.module.css";

export default function SplitPaneLeftPane({dividerPercent}) {

    return (
        <div className={styles.splitLeftPane}
             style={{width:`${dividerPercent}%`}}
        >
            {/*<TabBar />*/}
        </div>
    );
}