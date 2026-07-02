export { DialogService, dialogService } from './services/dialogService';
export type { DialogOptions } from './services/dialogService';

export { default as DialogPlugin } from './plugin';
export type { DialogPluginOptions } from './plugin';

export { useDialog } from './composables/useDialog';

export { default as DialogContainer } from './components/DialogContainer.vue';

export { DialogCancelledError } from './errors';
