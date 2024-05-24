// simplebox/simpleboxui.js

import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class GridImagesPluginUI extends Plugin {
    init() {
        console.log( 'GridImagesPluginUI#init() got called' );

        const editor = this.editor;
        const t = editor.t;
        editor.ui.componentFactory.add( 'insertGrid', locale => {
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                label: 'Insert grid',
                withText: true,
                tooltip: true
            } );

            buttonView.on( 'execute', () => {
                const columns = prompt('Enter the number of images per row:', '3');
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;

                input.onchange = () => {
                    const files = Array.from(input.files);

                    editor.model.change(writer => {
                        const selection = editor.model.document.selection;
                        const grid = writer.createElement('grid', { columns });

                        files.forEach(file => {
                            const reader = new FileReader();

                            reader.onload = () => {
                                editor.model.change(writer => {
                                    const gridItem = writer.createElement('gridItem', {
                                        src: reader.result
                                    });
                                    writer.append(gridItem, grid);
                                });
                            };

                            reader.readAsDataURL(file);
                        });

                        writer.insert(grid, selection.getFirstPosition());
                    });
                };

                input.click();
            });

            return buttonView;
        } );
    }
}