import styles from "./tabBar.module.css";
import {IconButton} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SettingsIcon from "@mui/icons-material/Settings";

export default function TabBarMenu({toggleTab}) {

    return (
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
    );
}