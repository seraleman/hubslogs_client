import { useQuasar } from 'quasar'

interface NotifyParam {
  color: string
  icon: string
  message: string
  textColor: string
}

const useGeneral = () => {
  const $q = useQuasar()

  const showLoading = () => {
    $q.loading.show({
      message: 'Por favor espera...',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'secondary',
    })
  }

  const hideLoading = () => {
    $q.loading.hide()
  }

  const notify = (arg: NotifyParam) => {
    const { color, icon, message, textColor } = arg
    $q.notify({
      color,
      icon,
      message,
      textColor,
    })
  }

  return {
    showLoading,
    hideLoading,
    notify,
  }
}

export default useGeneral
