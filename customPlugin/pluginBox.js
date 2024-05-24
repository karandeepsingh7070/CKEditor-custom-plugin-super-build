import { Plugin } from '@ckeditor/ckeditor5-core';
import PluginEditing from './pluginEditing';
import PluginUI from './pluginUi';

export default class PluginBox extends Plugin {
    static get requires() {
        return [ PluginEditing, PluginUI ];
    }
}