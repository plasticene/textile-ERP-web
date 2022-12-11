const useModal = () => {
  const modalVisible = ref(false)
  const modalTitle = ref('')

  const showModal = title => {
    modalVisible.value = true
    if (title) {
      modalTitle.value = title
    }
  }
  const closeModal = () => {
    modalVisible.value = false
  }

  return { modalVisible, modalTitle, showModal, closeModal }
}

export { useModal }
