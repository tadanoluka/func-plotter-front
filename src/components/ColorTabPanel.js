import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Divider, FormControlLabel, Grid} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import styles from '@/components/colorTabPanel.module.css';
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import ColorTabPanelProperty from "@/components/ColorTabPanelProperty";

export default function ColorTabPanel({ plotterComponentRef, graphCanvasComponentRef }) {

    const [isOpen, setIsOpen] = useState(false);
    const [checkedValue, setCheckedValue] = useState(false);

    const checkboxRef = useRef(null);

    const [mainParams, setMainParams] = useState({});
    const [parameters, setParameters] = useState([{}]);

    const [componentName, setComponentName] = useState("")

    function update() {
        console.log(graphCanvasComponentRef)
        if (!graphCanvasComponentRef || !graphCanvasComponentRef.current) {
            return
        }
        graphCanvasComponentRef.current.forceUpdate();

    }

    useEffect(() => {
        if (!plotterComponentRef || !plotterComponentRef.current) {
            return;
        }
        const p = (plotterComponentRef.current.getParams());
        setMainParams(p.mainParams);
        setComponentName(p.mainParams.name);
        setParameters(p.parameters);
    }, []);

    const gridItems = parameters.map((obj, index) => {
        if (!obj.getter) {
            return;
        }
        return (
            <ColorTabPanelProperty canvasUpdater={update} key={index} name={obj.name} type={obj.type} getter={obj.getter} setter={obj.setter}/>
        )
    });

    function handleClick({nativeEvent}) {
        const rect = checkboxRef.current.getBoundingClientRect()
        const checkboxEndX = rect.right;
        const checkboxEndY = rect.bottom;
        if (nativeEvent.clientX <= checkboxEndX && nativeEvent.clientY <= checkboxEndY) {
            return;
        }
        setIsOpen(!isOpen);
    }
    
    function handleCheckboxChange(event) {
        setCheckedValue(event.target.checked);
    }

    return (
        <>
            <div className={styles.accordion}>
                <div
                    onClick={handleClick}
                    className={isOpen
                        ? classNames(styles.accordionTop, styles.accordionTopOpen)
                        : classNames(styles.accordionTop, styles.accordionTopClose)}
                >
                    <div className={styles.myCheckboxContainer}>
                        <FormControlLabel
                            ref={checkboxRef}
                            control={<Checkbox checked={checkedValue} onChange={handleCheckboxChange}/>}
                            label={componentName}
                        />
                    </div>
                    <ExpandMoreIcon
                        className={isOpen
                            ? styles.accordionTopIconOpen
                            : styles.accordionTopIconClose}
                    />
                </div>
                <div className={isOpen
                    ? classNames(styles.accordionContent, styles.accordionContentOpen)
                    : classNames(styles.accordionContent, styles.accordionContentClose)}
                >
                    <Grid container spacing={0.5}>
                        {gridItems}
                    </Grid>

                </div>
            </div>

            <Divider />
        </>
    )
}