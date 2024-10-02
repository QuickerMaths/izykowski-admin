import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
    Calendar: componentLoader.add(
        'Calendar',
        './Calendar'
    ),
    TextEditor: componentLoader.add(
        'TextEditor',
        './TextEditor'
    ),
};

export { Components, componentLoader };
