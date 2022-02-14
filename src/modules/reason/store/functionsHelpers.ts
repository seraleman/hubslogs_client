import { useQuasar } from 'quasar'

const $q = useQuasar()

export const showLoading = () => {
	$q.loading.show({
		message: 'Por favor espera...',
		boxClass: 'bg-grey-2 text-grey-9',
		spinnerColor: 'secondary',
	})
}

export const hideLoading = () => {
	$q.loading.hide()
}
