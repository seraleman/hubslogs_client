<script lang="ts">
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'Confirmation',
	})
</script>

<script lang="ts" setup>
	import { ref, watch } from 'vue'

	const emit = defineEmits(['closeConfirmation', 'delete'])

	const props = defineProps({
		objectName: { type: String, required: true },
		openConfirmation: { type: Boolean, required: true },
		text: { type: String, required: true },
	})

	const isConfirmationOpen = ref(false)

	const toggleIsConfirmationOpen = () => {
		isConfirmationOpen.value = !isConfirmationOpen.value
	}

	watch(
		() => props.openConfirmation,
		(openConfirmation) => {
			if (openConfirmation) toggleIsConfirmationOpen()
		}
	)
</script>

<template>
	<q-dialog v-model="isConfirmationOpen" @hide="emit('closeConfirmation')">
		<q-card class="my-card">
			<q-card-section>
				<div class="text-h6">Confirmación</div>
			</q-card-section>

			<q-card-section style="max-height: 50vh" class="scroll">
				<span class="text-body1">
					{{ text }}
					<span class="text-weight-medium"> {{ objectName }}</span>
				</span>
			</q-card-section>

			<q-card-actions align="right" class="q-pa-md">
				<q-btn flat color="secondary" label="Cancelar" v-close-popup />
				<q-btn
					color="secondary"
					label="Eliminar"
					v-close-popup
					@click="$emit('delete')"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<style scoped></style>
