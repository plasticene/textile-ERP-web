const useClosePage = toPath => {
  const remove = inject('remove')

  const route = useRoute()

  const close = to => {
    remove(route.path, to ? to : toPath)
  }

  return {
    close
  }
}

export { useClosePage }
