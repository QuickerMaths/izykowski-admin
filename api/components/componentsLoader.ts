import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
    TextEditor: componentLoader.add(
        'TextEditor',
        './TextEditor'
    ),
};

export { Components, componentLoader };
