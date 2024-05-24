// simplebox/insertsimpleboxcommand.js

import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertGalleryPluginCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertObject( createGallery( writer ) );
        } );
    }

    // refresh() {
    //     const model = this.editor.model;
    //     const selection = model.document.selection;
    //     const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'pluginBox' );

    //     this.isEnabled = allowedIn !== null;
    // }
}

function createGallery( writer ) {
    const gallery = writer.createElement( 'gallery' );
        const galleryItem = writer.createElement( 'galleryItem' );
        writer.append( galleryItem, gallery );

    return simpleBox;
}
