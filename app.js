
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { ImageInsert, ImageResize, ImageCaption, ImageResizeEditing, ImageEditing, ImageToolbar, ImageInsertViaUrl, PictureEditing, ImageStyle } from '@ckeditor/ckeditor5-image';
import { Image } from '@ckeditor/ckeditor5-image';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { LinkEditing } from '@ckeditor/ckeditor5-link';
import { Table, TableCellProperties, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
import GalleryPlugin from './galleryPlugin/galleryPlugin';
import GridImagesPlugin from './GridImagesPlugin/GridImagesPlugin';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Font } from "@ckeditor/ckeditor5-font"
import { Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
// import CKEditorInspector from '@ckeditor/ckeditor5-inspector'; 

console.log(("initialised CK Editor"))
function initCkEditor() {
    let timer;
    ClassicEditor
        .create(document.querySelector('#editor'), {
            plugins: [Essentials, Paragraph, Heading, List, Bold, Italic, FindAndReplace, LinkEditing, HtmlEmbed,GridImagesPlugin,
                Base64UploadAdapter, ImageResize, ImageCaption, ImageResizeEditing, PictureEditing, Image, LinkImage,
                Font,
                Strikethrough, Underline,
                ImageInsert, ImageToolbar, ImageCaption, ImageStyle, ImageResize, Link,
                Table, TableToolbar, TableProperties, TableCellProperties, MediaEmbed],
            toolbar: {
                items: ['heading', 'bold', 'italic', 'strikethrough', 'underline', 'outdent', 'indent', '|', 'fontFamily', 'fontSize', 'fontColor', '|', 'numberedList', 'bulletedList', 'findAndReplace', 'insertTable', '|', 'imageUpload', 'insertGallery', 'insertGrid', 'link', 'unlink', 'mediaEmbed', '|', 'htmlEmbed',
                    '|',
                    'undo', 'redo']
            },
            image: {
                toolbar: [
                    'imageStyle:inline',
                    'imageStyle:block',
                    'imageStyle:side',
                    'imageStyle:alignLeft',
                    '|',
                    'toggleImageCaption',
                    'linkImage',
                    'unlink',
                    'imageTextAlternative',
                    'resizeImage'
                ]
            },
            table: {
                contentToolbar: [
                    'tableColumn', 'tableRow', 'mergeTableCells',
                    'tableProperties', 'tableCellProperties'
                ],
            },
            fontFamily: {
                options: [
                    'default',
                    'Arial, Helvetica, sans-serif',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif'
                ],
                supportAllValues: true
            },
            placeholder: 'Add Content Here',
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            htmlSupport: {
                allow: [
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                        styles: true
                    }
                ]
            },
            htmlEmbed: {
                showPreviews: true
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
        })
        .then(editor => {
            console.log('Editor was initialized', editor);
            //custom upload adapter
            // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            //     return new ImageUploadAdapter(loader, cred.accessToken, cred.apiKey, cb)
            // }
            // editor.model.document.on('change:data', () => {
            //     const editorData = editor.getData();
            //     clearTimeout(timer)
            //     timer = setTimeout(() => {
            //         ckEditorDataSave(editorData);
            //     }, 1000)
            // });
            // if (value) {
            //     editor.setData(value);
            // }

            // CKEditorInspector.attach( 'editor', editor ); Debugger tool for ckeditor

            window.editor = editor;
        })
        .catch(error => {
            console.error(error.stack);
        });
}

window.initCkEditor = initCkEditor
initCkEditor()
// export default initCkEditor
// initCkEditor({ value: "", ckEditorDataSave : null, ImageUploadAdapter : null })