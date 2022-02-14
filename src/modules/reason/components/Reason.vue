<script lang="ts">
	import { defineComponent, ref } from 'vue'
	export default defineComponent({
		name: 'Reason',
	})
</script>

<script lang="ts" setup>
	import Confirmation from '../components/Confirmation.vue'
	import { useReasonStore } from '../store/useReasonStore'
	import { showLoading, hideLoading } from '../store/functionsHelpers'

	const emit = defineEmits(['goBack'])
	const props = defineProps({
		reason: {
			required: true,
			type: Object,
		},
	})

	const openConfirmation = ref(false)

	const toggleOpenConfirmation = () => {
		openConfirmation.value = !openConfirmation.value
	}

	const deleteConfirmedReason = async (id: string) => {
		showLoading()
		const resp = await useReasonStore.deleteReason(id)
		hideLoading()
		if (resp) emit('goBack')
	}

	const onDelete = () => {
		toggleOpenConfirmation()
	}
</script>

<template>
	<q-page padding>
		<div class="row q-px-sm q-pb-sm">
			<q-btn
				flat
				class="q-ma-xs"
				color="secondary"
				icon="las la-arrow-circle-left"
				@click="$emit('goBack')"
			/>

			<q-space />

			<q-btn
				outline
				class="q-ma-xs"
				color="secondary"
				icon="las la-pen"
				@click="onEdit()"
			/>

			<q-btn
				outline
				class="q-ma-xs"
				color="negative"
				icon="las la-trash-alt"
				@click="onDelete(reason)"
			/>
		</div>

		<q-card class="my-card">
			<q-card-section class="text-h6">
				{{ reason.name }}
			</q-card-section>
			<q-card-section>
				{{ reason.description }}
			</q-card-section>
		</q-card>
	</q-page>

	<confirmation
		:objectName="reason.name"
		:openConfirmation="openConfirmation"
		:text="'Confirma que desea eliminar la razón'"
		@closeConfirmation="toggleOpenConfirmation"
		@delete="deleteConfirmedReason"
	/>
</template>

<style lang="scss" scoped></style>
