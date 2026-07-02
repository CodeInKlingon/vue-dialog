import type { App } from 'vue';
import { dialogService, DialogService } from './services/dialogService';
import DialogContainer from './components/DialogContainer.vue';

export interface DialogPluginOptions {
	dialogService?: DialogService;
}

export default {
	install(app: App, options?: DialogPluginOptions) {
		const service = options?.dialogService ?? dialogService;
		app.component('Dialogs', DialogContainer);
		app.provide('dialogService', service);
	},
};
