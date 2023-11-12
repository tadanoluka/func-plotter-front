import styles from "./footer.module.css";

export default function Footer({footerRef}) {

    return (
        <footer className={styles.footer} ref={footerRef}>
            <div className={styles.footerLeft}>
                <div>X: </div>
                <div>Y: </div>
            </div>
            <div className={styles.footerRight}>
                <div>Scale: </div>
                <div>Scale Ratio: </div>
            </div>
        </footer>
    );
}