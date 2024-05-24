
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import PluginBox from './customPlugin/pluginBox';
import GalleryPlugin from './galleryPlugin/galleryPlugin';
import { ImageInsert, ImageResize,ImageCaption,ImageResizeEditing,ImageEditing,ImageToolbar,ImageInsertViaUrl,PictureEditing } from '@ckeditor/ckeditor5-image';
import { Image } from '@ckeditor/ckeditor5-image';
import {Base64UploadAdapter} from '@ckeditor/ckeditor5-upload';
import { LinkEditing } from '@ckeditor/ckeditor5-link';
import { Table, TableCellProperties, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';

// import CKEditorInspector from '@ckeditor/ckeditor5-inspector'; 

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic,FindAndReplace,LinkEditing,GalleryPlugin,
            Image, ImageInsert,Base64UploadAdapter,ImageResize,ImageCaption,ImageResizeEditing,ImageEditing,ImageToolbar,ImageInsertViaUrl,PictureEditing,
            PluginBox,
            Table, TableToolbar, TableProperties, TableCellProperties, ],
        toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList','findAndReplace','insertImage', 'imageToolbar','insertTable', 'pluginBox','insertGallery' ],
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableProperties', 'tableCellProperties'
            ],
        }
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );

        // CKEditorInspector.attach( 'editor', editor ); Debugger tool for ckeditor

        window.editor = editor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );
