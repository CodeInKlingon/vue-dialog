export class DialogCancelledError extends Error {
	constructor(message?: string) {
		super(message ?? 'Dialog was cancelled');
		this.name = 'DialogCancelledError';
	}
}
