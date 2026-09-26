export const useToast = () => {
	const message = useState<string>('toast-message', () => '')
	const isVisible = useState<boolean>('toast-visible', () => false)
	let timer: any = null

	const show = (msg: string, duration = 2500) => {
		message.value = msg
		isVisible.value = true
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			isVisible.value = false
		}, duration)
	}

	return {
		message,
		isVisible,
		show
	}
}
