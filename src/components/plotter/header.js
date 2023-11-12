import styles from "./header.module.css";

export default function Header({headerRef}) {

    return (
        <header className={styles.header} ref={headerRef}>
            Привет
        </header>
    );
}