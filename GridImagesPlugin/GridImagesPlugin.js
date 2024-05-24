import { Plugin } from '@ckeditor/ckeditor5-core';
import GridImagesPluginEditing from './GridImagesPluginEditing';
import GridImagesPluginUI from './GridImagesPluginUI';

export default class GridImagesPlugin extends Plugin {
    static get requires() {
        return [ GridImagesPluginEditing, GridImagesPluginUI ];
    }
}