import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BasePropertyProps } from 'adminjs';
import AdminJS from 'adminjs';

const TextEditor = (props: BasePropertyProps) => {
    const { record, property, onChange } = props;

    const propValue = record?.params[property.path]
    const [value, setValue] = useState(propValue)

    useEffect(() => {
        if (value !== propValue) {
            setValue(propValue)
        }
    }, [propValue])

    if(!onChange) {
        return <p>Loading...</p>
    }

    return (
        <Editor
        apiKey={AdminJS.env.TINYMCE_API_KEY}
        value={value ?? ''}
        init={{
            plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            ],
            toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
            ],
        }}
        onBlur={() => onChange(property.path, value)}
        onEditorChange={(content) => setValue(content)}
        />
    );
};

export default TextEditor;

