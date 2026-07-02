# @codeinklingon/vue-dialog

[![npm](https://img.shields.io/npm/v/@codeinklingon/vue-dialog)](https://www.npmjs.com/package/@codeinklingon/vue-dialog)

A type-safe dialog service for Vue 3. Provides a programmatic dialog API with compile-time emit enforcement.

## Installation

```bash
npm install @codeinklingon/vue-dialog
```

## Usage

### 1. Install the plugin

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { DialogPlugin } from '@codeinklingon/vue-dialog';

// Without router
createApp(App).use(DialogPlugin).mount('#app');

// With router — blocks navigation while a dialog is open
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({ history: createWebHistory(), routes: [] });
createApp(App).use(DialogPlugin, { router }).use(router).mount('#app');
```

### 2. Add the `<Dialogs />` component to your app root

```vue
<template>
	<Dialogs />
	<router-view />
</template>
```

### 3. Create a dialog component

Your dialog **must** declare `resolve` and `reject` emits:

```vue
<script setup lang="ts">
defineProps<{ message: string }>();
const emit = defineEmits<{
	resolve: [result: string];
	reject: [reason?: string];
}>();

function confirm() {
	emit('resolve', 'ok');
}

function cancel() {
	emit('reject', 'user cancelled');
}
</script>
```

Components without these emits will be rejected at compile time.

### 4. Open a dialog

```ts
import { useDialog } from '@codeinklingon/vue-dialog';
import MyDialog from './MyDialog.vue';

const dialog = useDialog();

async function open() {
	const { result } = await dialog.add({
		component: MyDialog,
		props: { message: 'Are you sure?' },
	});
	console.log('User chose:', result);
}
```

## API

### `useDialog()` → `DialogService`

Returns the shared dialog service instance. Throws if the plugin isn't installed.

### `dialogService.add(options)` → `Promise<{ result }>`

Opens a dialog. `options.component` must declare `resolve`/`reject` emits.
`options.props` is automatically typed from the component's props (with `onResolve`/`onReject` filtered out).

### `dialogService.closeAll()`

Rejects all open dialogs.

### `dialogService.hasOpenDialogs()` → `boolean`

### `DialogCancelledError`

Error class used when dialogs are rejected non-explicitly.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start demo app dev server |
| `npm run build` | Build library |

## License

MIT
