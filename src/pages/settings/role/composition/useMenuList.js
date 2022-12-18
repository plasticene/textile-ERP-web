import { getRoleMenuList } from '@/services'
function useMenuList(roleId) {
  const menuList = ref([])
  const checkedKeys = ref([])
  watch(
    () => roleId.value,
    val => {
      if (!val) {
        return
      }
      console.log('%c Line:14 🥓 val', 'color:#e41a6a', val)
      getRoleMenuList(val).then(res => {
        menuList.value = [
          {
            name: '全部',
            id: 0,
            nodeList: res.data
          }
        ]
        checkedKeys.value = []
        getcheckedKeys(menuList.value)
      })
    },
    { immediate: true }
  )
  const getcheckedKeys = menus => {
    menus.forEach(ele => {
      if (ele.isSelect) {
        checkedKeys.value.push(ele.id)
      }
      if (ele.nodeList?.length) {
        getcheckedKeys(ele.nodeList)
      }
    })
  }
  return { menuList, checkedKeys }
}

export { useMenuList }
