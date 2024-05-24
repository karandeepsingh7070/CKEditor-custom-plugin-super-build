import { Plugin } from '@ckeditor/ckeditor5-core';
import GalleryPluginEditing from './galleryPluginEditing';
import GalleryPluginUi from './galleryPluginUi';

export default class GalleryPlugin extends Plugin {
    static get requires() {
        return [ GalleryPluginEditing, GalleryPluginUi ];
    }
}