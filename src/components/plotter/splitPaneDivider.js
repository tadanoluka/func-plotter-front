import styles from "@/components/plotter/splitPane.module.css";

export default function SplitPaneDivider({startDragging}) {

    return (
        <div className={styles.splitPaneDivider} onMouseDown={startDragging}/>
    );
}