import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';
import InsertSimpleBoxCommand from './insertPluginBoxCommand';

export default class PluginEditing extends Plugin {
    static get requires() {                                                 
        return [ Widget ];
    }
    init() {
        console.log( 'pluginBoxEditing#init() got called' );
        this._defineSchema(); 
        this._defineConverters();  
        this.editor.commands.add( 'insertSimpleBox', new InsertSimpleBoxCommand( this.editor ) )
    }

    _defineSchema() {                                                     
        const schema = this.editor.model.schema;

        schema.register( 'pluginBox', {
            inheritAllFrom: '$blockObject'
        } );

        schema.register( 'pluginBoxTitle', {
            isLimit: true,
            allowIn: 'pluginBox',
            allowContentOf: '$block'
        } );

        schema.register( 'pluginBoxDescription', {
            isLimit: true,
            allowIn: 'pluginBox',
            allowContentOf: '$root'
        } );
        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'simpleBoxDescription' ) && childDefinition.name == 'simpleBox' ) {
                return false;
            }
        } );
    }
    _defineConverters() {                                                   
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'pluginBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pluginBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pluginBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'simple-box' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        // <simpleBoxTitle> converters.
        conversion.for( 'upcast' ).elementToElement( {
            model: 'pluginBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pluginBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pluginBoxTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'h1', { class: 'simple-box-title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters.
        conversion.for( 'upcast' ).elementToElement( {
            model: 'pluginBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pluginBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pluginBoxDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'simple-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}