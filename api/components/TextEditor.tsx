import React, { useState, useEffect, useRef } from 'react';
import { BasePropertyProps } from 'adminjs';
import BundledEditor from './BundleEditor.js';

const TextEditor = (props: BasePropertyProps) => {
    const { record, property, onChange } = props;

    const propValue = record?.params[property.path]
    const [value, setValue] = useState(propValue)
    const editorRef = useRef(null);

    useEffect(() => {
        if (value !== propValue) {
            setValue(propValue)
        }
    }, [propValue])

    if(!onChange) {
        return <p>Loading...</p>
    }

    return (
        <BundledEditor 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInit={(evt: any, editor: null) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                'searchreplace', 'table', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        value={value}
        setValue={setValue}
        onChange={onChange}
        property={property}
        />
    );
};

export default TextEditor;

