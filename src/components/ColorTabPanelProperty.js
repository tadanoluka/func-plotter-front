import {Grid} from "@mui/material";
import ColorTabPanelSliderField from "@/components/ColorTabPanelSliderField";
import styles from '@/components/colorTabPanel.module.css';

export default function ColorTabPanelProperty({ canvasUpdater, name, type, getter, setter}) {

    function getField(type) {
        switch (type) {
            case "slider": {
                return (
                    <ColorTabPanelSliderField canvasUpdater={canvasUpdater} getter={getter} setter={setter}/>
                );
            }
            default: {
                return (
                    <div>
                        Def
                    </div>
                )
            }
        }
    }

    return (
        <>
            <Grid item xs={4}>
                {name}
            </Grid>
            <Grid item xs={8}>
                {getField(type)}
            </Grid>
        </>
    )
}