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
            view: ( modelElement, { writer } ) => {
                const div = writer.createContainerElement( 'div', { class: 'gallery' } );
                return toWidget( div, writer, { label: 'gallery widget' } );
            }
        });

        conversion.for( 'editingDowncast' ).elementToElement({
            model: 'galleryItem',
            view: ( modelElement, { writer } ) => {
                const figure = writer.createContainerElement( 'figure', { class: 'gallery-item' } );
                const img = writer.createEmptyElement( 'img', { src: modelElement.getAttribute( 'src' ) } );
                writer.insert( writer.createPositionAt( figure, 0 ), img );
                return toWidget( figure, writer );
            }
        });

        // Data conversion
        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'gallery',
            view: (modelElement, { writer }) => {
                return writer.createContainerElement('div', {
                    class: 'gallery',
                });
            }
        });

        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'galleryItem',
            view: ( modelElement, { writer } ) => {
                const figure = writer.createContainerElement( 'figure', { class: 'gallery-item' } );
                const img = writer.createEmptyElement( 'img', { src: modelElement.getAttribute( 'src' ) } );
                writer.insert( writer.createPositionAt( figure, 0 ), img );
                return toWidgetEditable(figure, writer);
                // return figure;
            }
        });

        conversion.for( 'upcast' ).elementToElement({
            view: {
                name: 'div',
                classes: 'gallery'
            },
            model: (viewElement, { writer }) => {
                return writer.createElement('grid');
            }
        });

        conversion.for( 'upcast' ).elementToElement({
            view: {
                name: 'figure',
                classes: 'gallery-item'
            },
            model: ( viewElement, { writer } ) => {
                const src = viewElement.getChild( 0 ).getAttribute( 'src' );
                return writer.createElement( 'galleryItem', { src } );
            }
        });
    }
}