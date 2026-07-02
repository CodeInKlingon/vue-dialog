<script setup lang="ts">
import { ref } from 'vue';
import MyActionDialog from './MyActionDialog.vue';
import { useDialog } from '../../composables/useDialog';

const dialogService = useDialog();

defineProps<{ msg: string }>();

const count = ref(0);
const busy = ref(false);

async function testGood() {
	busy.value = true;
	try {
		const { result } = await dialogService.add({
			component: MyActionDialog,
			props: { message: 'Hello from dialog!', currentCount: count.value },
		});
		console.log('Dialog result:', result);
	} catch (error) {
		console.error('Dialog error:', error);
	}
	busy.value = false;
}
</script>

<template>
	<div class="card">
		<button type="button" @click="count++">count is {{ count }}</button>
		<button type="button" @click="testGood" :disabled="busy">Test</button>
	</div>
	<pre>{{ { busy: busy } }}</pre>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
