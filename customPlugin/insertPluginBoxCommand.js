// simplebox/insertsimpleboxcommand.js

import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertSimpleBoxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertObject( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'pluginBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const simpleBox = writer.createElement( 'pluginBox' );
    const simpleBoxTitle = writer.createElement( 'pluginBoxTitle' );
    const simpleBoxDescription = writer.createElement( 'pluginBoxDescription' );

    writer.append( simpleBoxTitle, simpleBox );
    writer.append( simpleBoxDescription, simpleBox );
    writer.appendElement( 'paragraph', simpleBoxDescription );

    return simpleBox;
}
