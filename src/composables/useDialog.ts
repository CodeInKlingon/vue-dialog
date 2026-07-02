import { inject } from 'vue';
import type { DialogService } from '../services/dialogService';

export function useDialog(): DialogService {
	const service = inject<DialogService>('dialogService');
	if (!service) {
		throw new Error(
			'[DialogService] Plugin not installed. Use app.use(DialogPlugin) first.',
		);
	}
	return service;
}
