import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
// import { downcastElementToElement, upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';

export default class GridImagesPluginEditing extends Plugin {
    static get requires() {                                                 
        return [ Widget ];
    }
    init() {
        console.log( 'GridImagesPluginEditing was initialized' );
        this._defineSchema();
        this._defineConverters();
        const editor = this.editor;
    }
    _defineSchema() {                                                     
        const schema = this.editor.model.schema;
        schema.register('grid', {
            isObject: true,
            allowWhere: '$block',
            allowContentOf: '$block',
            allowAttributes: [ 'columns' ]
        });

        schema.register('gridItem', {
            isObject: true,
            allowIn: 'grid',
            allowAttributes: [ 'src' ]
        });
    }
    _defineConverters() {                                                   
        const conversion = this.editor.conversion;
        conversion.for('editingDowncast').elementToElement({
            model: 'grid',
            view: (modelElement, { writer }) => {
                const div = writer.createContainerElement('div', {
                    class: 'grid',
                    style: `display: grid; gap: 10px; grid-template-columns: repeat(${modelElement.getAttribute('columns') || 3}, 1fr);`
                });
                return toWidget(div, writer, { label: 'grid widget' });
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'gridItem',
            view: (modelElement, { writer }) => {
                const figure = writer.createContainerElement('figure', { class: 'grid-item' });
                const img = writer.createEmptyElement('img', { src: modelElement.getAttribute('src') });
                writer.insert(writer.createPositionAt(figure, 0), img);
                return toWidget(figure, writer);
            }
        });

        // Data conversion
        conversion.for('dataDowncast').elementToElement({
            model: 'grid',
            view: (modelElement, { writer }) => {
                return writer.createContainerElement('div', {
                    class: 'grid',
                    style: `display: grid; gap: 10px; grid-template-columns: repeat(${modelElement.getAttribute('columns') || 3}, 1fr);`
                });
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'gridItem',
            view: (modelElement, { writer }) => {
                const figure = writer.createContainerElement('figure', { class: 'grid-item' });
                const img = writer.createEmptyElement('img', { src: modelElement.getAttribute('src') });
                writer.insert(writer.createPositionAt(figure, 0), img);
                return toWidgetEditable(img, writer);
                // return figure;
            }
        });

        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'grid'
            },
            model: (viewElement, { writer }) => {
                const columns = viewElement.getStyle('grid-template-columns')
                    ? viewElement.getStyle('grid-template-columns').match(/repeat\((\d+), 1fr\)/)[1]
                    : 3;
                return writer.createElement('grid', { columns });
            }
        });

        conversion.for('upcast').elementToElement({
            view: {
                name: 'figure',
                classes: 'grid-item'
            },
            model: (viewElement, { writer }) => {
                const src = viewElement.getChild(0).getAttribute('src');
                return writer.createElement('gridItem', { src });
            }
        });
    }
}