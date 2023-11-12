import TabBarMenu from "@/components/plotter/tabBarMenu";
import TabBarPanels from "@/components/plotter/tabBarPanels";
import {useState} from "react";

export default function TabBar() {

    const [currentTab, setCurrentTab] = useState(1)

    const toggleTab = (value) => {
        setCurrentTab(value);
    }

    return (
        <>
            <TabBarMenu toggleTab={toggleTab} />
            <TabBarPanels currentTab={currentTab} />
        </>
    )
}