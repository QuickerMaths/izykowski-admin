/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import tinymce from 'tinymce';
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';

import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

import 'tinymce/plugins/emoticons/js/emojis';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BundledEditor(props: any) {
  const {init, value, setValue, onChange, property, ...rest} = props;
 
  return (
    <Editor
      init={{
        ...init,
        skin: false,
        content_css: false,
        content_style: [init.content_style || ''].join('\n'),
      }}
      value={value ?? ""}
      onBlur={() => onChange(property.path, value)}
      onEditorChange={(content) => setValue(content)}
      {...rest}
    />
  );
}

