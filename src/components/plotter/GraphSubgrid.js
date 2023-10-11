import {GraphGrid} from "@/components/plotter/GraphGrid";

export class GraphSubgrid extends GraphGrid {
    name = "Subgrid"

    color = "rgb(255 255 255 / 10%)";
    dashLength = 2;
    dashInterval = 2;

    step = 5;
}