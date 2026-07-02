<template>
	<div class="dialog-overlay" @click="reject">
		<div class="dialog-content" @click.stop>
			<h2>Action Dialog</h2>
			<p>{{ message }}</p>
			<p>Current count is: {{ currentCount }}</p>
			<button @click="resolve('Confirmed')">Confirm</button>
			<button @click="reject">Cancel</button>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	message: string;
	currentCount: number;
}>();

const emit = defineEmits(['resolve', 'reject']);

function resolve(result: any) {
	emit('resolve', result);
}

function reject() {
	emit('reject', 'Cancelled');
}
</script>

<style scoped>
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.dialog-content {
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
