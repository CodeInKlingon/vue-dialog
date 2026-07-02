<template>
	<teleport v-if="dialogs.length > 0" to="body">
		<div class="dialog-container">
			<component
				v-for="dialog in dialogs"
				:key="dialog.id"
				:is="dialog.component"
				v-bind="dialog.props"
				@resolve="(result: any) => resolveDialog(dialog.id, result)"
				@reject="(reason?: any) => rejectDialog(dialog.id, reason)"
			/>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { dialogService } from '../services/dialogService';

const dialogs = computed(() => dialogService.getDialogs().value);

function resolveDialog(id: number, result: any) {
	dialogService.resolve(id, result);
}

function rejectDialog(id: number, reason?: any) {
	dialogService.reject(id, reason);
}
</script>

<style scoped>
.dialog-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}
</style>
