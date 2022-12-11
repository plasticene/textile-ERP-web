const useTasksLoad = () => {
  const tasks = ref({})

  const onTasksLoaded = tasksObject => {
    tasks.value = tasksObject
  }

  return { tasks, onTasksLoaded }
}

export { useTasksLoad }
