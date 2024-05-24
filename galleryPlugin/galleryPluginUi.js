// simplebox/simpleboxui.js

import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class GalleryPluginUi extends Plugin {
    init() {
        console.log( 'GalleryPluginUI#init() got called' );

        const editor = this.editor;
        const t = editor.t;
        editor.ui.componentFactory.add( 'insertGallery', locale => {
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                label: 'Insert gallery',
                withText: true,
                tooltip: true
            } );

            buttonView.on( 'execute', () => {
                const input = document.createElement( 'input' );
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;

                input.onchange = () => {
                    const files = Array.from( input.files );

                    editor.model.change( writer => {
                        const selection = editor.model.document.selection;
                        let gallery = selection.getFirstPosition().findAncestor('gallery');

                        if (!gallery) {
                            gallery = writer.createElement('gallery');
                            writer.insert(gallery, selection.getFirstPosition());
                        }

                        files.forEach( file => {
                            const reader = new FileReader();

                            reader.onload = () => {
                                editor.model.change( writer => {
                                    const galleryItem = writer.createElement('galleryItem', {
                                        src: reader.result
                                    });
                                    writer.append(galleryItem, gallery);
                                });
                            };

                            reader.readAsDataURL( file );
                        });
                    });
                };

                input.click();
            });

            return buttonView;
        } );
    }
}