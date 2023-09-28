import styles from "./layout.module.css";
import Head from "next/head";

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>FuncPlotter</title>
                <meta name="description" content="FuncPlotter" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>{children}</main>
        </div>
    );
}