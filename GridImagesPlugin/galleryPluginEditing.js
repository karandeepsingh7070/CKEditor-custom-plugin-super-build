import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
// import { downcastElementToElement, upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';

export default class GalleryPluginEditing extends Plugin {
    static get requires() {                                                 
        return [ Widget ];
    }
    init() {
        console.log( 'GalleryPlugin was initialized' );
        this._defineSchema();
        this._defineConverters();
        const editor = this.editor;
    }
    _defineSchema() {                                                     
        const schema = this.editor.model.schema;
        schema.register( 'gallery', {
            isObject: true,
            allowWhere: '$block',
            allowContentOf: '$block'
        });

        schema.register( 'galleryItem', {
            isLimit: true,
            allowIn: 'gallery',
            allowContentOf: [ 'src' ]
        });
    }
    _defineConverters() {                                                   
        const conversion = this.editor.conversion;
        conversion.for( 'editingDowncast' ).elementToElement({
            model: 'gallery',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'gallery' } );
                return toWidget( div, viewWriter, { label: 'gallery widget' } );
            }
        });

        conversion.for( 'editingDowncast' ).elementToElement({
            model: 'galleryItem',
            view: ( modelElement, { writer: viewWriter } ) => {
                const figure = viewWriter.createContainerElement( 'figure', { class: 'gallery-item' } );
                const img = viewWriter.createEmptyElement( 'img', { src: modelElement.getAttribute( 'src' ) } );
                viewWriter.insert( viewWriter.createPositionAt( figure, 0 ), img );
                return toWidget( figure, viewWriter );
            }
        });

        // Data conversion
        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'gallery',
            view: 'div'
        });

        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'galleryItem',
            view: ( modelElement, { writer: viewWriter } ) => {
                const figure = viewWriter.createContainerElement( 'figure', { class: 'gallery-item' } );
                const img = viewWriter.createEmptyElement( 'img', { src: modelElement.getAttribute( 'src' ) } );
                viewWriter.insert( viewWriter.createPositionAt( figure, 0 ), img );
                return figure;
            }
        });

        conversion.for( 'upcast' ).elementToElement({
            view: {
                name: 'div',
                classes: 'gallery'
            },
            model: 'gallery'
        });

        conversion.for( 'upcast' ).elementToElement({
            view: {
                name: 'figure',
                classes: 'gallery-item'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                const src = viewElement.getChild( 0 ).getAttribute( 'src' );
                return modelWriter.createElement( 'galleryItem', { src } );
            }
        });
    }
}