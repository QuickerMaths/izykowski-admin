import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
    Calendar: componentLoader.add(
        'Calendar',
        './Calendar'
    ),
    Editor: componentLoader.add(
        'TextEditor',
        './TextEditor'
    ),
};

export { Components, componentLoader };
