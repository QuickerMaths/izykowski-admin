import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
    Calendar: componentLoader.add(
        'Calendar',
        './Calendar'
    ),
};

export { Components, componentLoader };
