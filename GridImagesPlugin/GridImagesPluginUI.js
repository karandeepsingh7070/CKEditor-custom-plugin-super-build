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
                //custom upload adapter
                // input.onchange = () => {
                //     const files = Array.from(input.files);

                //     editor.model.change(writer => {
                //         const selection = editor.model.document.selection;
                //         const grid = writer.createElement('grid', { columns });
                //         const loader = editor.plugins.get('FileRepository').createLoader(files);
                //         loader.upload().then((response) => {
                //             editor.model.change(writer => {
                    
                //                 files.forEach(image => {
                //                     const imageElement = writer.createElement('gridItem', {
                //                         src: response.default
                //                     });
                //                     writer.append(imageElement, grid);
                //                 });
                    
                //                 editor.model.insertContent(grid, selection);
                //             });
                //         }).catch((e) => {
                //             console.log(e)
                //         })
                //     });
                // };

                input.click();
            });

            return buttonView;
        } );
        const observer = new MutationObserver(() => {
            console.log(editor.editing.view.getDomRoot().querySelectorAll('.gallery-item'))
            const images = editor.editing.view.getDomRoot().querySelectorAll('.gallery-item');
            images.forEach(image => {
                image.addEventListener('click', () => console.log("something"));
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}