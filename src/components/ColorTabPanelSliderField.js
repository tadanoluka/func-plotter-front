import {Slider} from "@mui/material";
import {useState} from "react";

export default function ColorTabPanelSliderField({canvasUpdater, getter, setter}) {

    const [value, setValue] = useState(getter())

    function handleChange(event, newValue, activeThumb) {
        setValue(newValue);
        setter(newValue);
        canvasUpdater();
    }

    return (
        <Slider
            value={value}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChange}
        />
    )
}