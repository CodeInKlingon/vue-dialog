import type { App } from 'vue';
import { dialogService, DialogService } from './services/dialogService';
import DialogContainer from './components/DialogContainer.vue';

export interface DialogPluginOptions {
	dialogService?: DialogService;
	router?: {
		beforeEach: (guard: (to: unknown, from: unknown) => void | boolean | Promise<void | boolean>) => void;
	};
}

export default {
	install(app: App, options?: DialogPluginOptions) {
		const service = options?.dialogService ?? dialogService;
		app.component('Dialogs', DialogContainer);
		app.provide('dialogService', service);

		options?.router?.beforeEach(() => {
			if (service.hasOpenDialogs()) {
				return false;
			}
		});
	},
};
