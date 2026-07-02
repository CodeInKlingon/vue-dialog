import { ref, markRaw } from 'vue';
import type { Component } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

type ExtractEmitParamType<T extends Component, K extends keyof ComponentProps<T>> = ComponentProps<T>[K] extends infer R | undefined
	? R extends (first: infer P, ...rest: any[]) => any
		? P
		: never
	: never;

type ComponentWithCallbackProps<T extends Component> = 'onResolve' extends keyof ComponentProps<T>
	? 'onReject' extends keyof ComponentProps<T>
		? T
		: never
	: never;

export interface DialogOptions<T extends Component> {
	component: ComponentWithCallbackProps<T>;
	props?: Omit<ComponentProps<T>, 'onResolve' | 'onReject'>;
}

interface DialogInstance<T extends Component> extends DialogOptions<T> {
	id: number;
	resolve: (value: any) => void;
	reject: (reason?: any) => void;
}

export class DialogService {
	private dialogs = ref<DialogInstance<Component>[]>([]);
	private counter = 0;

	add<T extends Component>(options: DialogOptions<T>): Promise<{ result: ExtractEmitParamType<T, 'onResolve'> }> {
		return new Promise((resolve, reject) => {
			const id = ++this.counter;
			this.dialogs.value.push({
				id,
				component: markRaw(options.component),
				props: options.props,
				resolve,
				reject,
			} as DialogInstance<Component>);
		});
	}

	remove(id: number) {
		const index = this.dialogs.value.findIndex((d) => d.id === id);
		if (index !== -1) {
			this.dialogs.value.splice(index, 1);
		}
	}

	resolve(id: number, result: any) {
		const dialog = this.dialogs.value.find((d) => d.id === id);
		if (dialog) {
			dialog.resolve({ result });
			this.remove(id);
		}
	}

	reject(id: number, reason?: any) {
		const dialog = this.dialogs.value.find((d) => d.id === id);
		if (dialog) {
			dialog.reject(reason);
			this.remove(id);
		}
	}

	getDialogs() {
		return this.dialogs;
	}

	hasOpenDialogs() {
		return this.dialogs.value.length > 0;
	}

	closeAll() {
		const dialogs = [...this.dialogs.value];
		this.dialogs.value = [];
		for (const dialog of dialogs) {
			dialog.reject(undefined);
		}
	}
}

export const dialogService = new DialogService();
