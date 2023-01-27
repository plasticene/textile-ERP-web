import { useRequest } from '@/hooks'
import { getMachineSetList, getWorkshopPageList } from '@/services'
function useFilter() {
  const { data: workshopList } = useRequest(getWorkshopPageList, {
    defaultData: [],
    params: {
      pageNo: 1,
      pageSize: 1000
    },
    beforeToRef(res) {
      return res.list
    }
  })
  const { data: machineTypeList } = useRequest(getMachineSetList, {
    defaultData: [],
    beforeToRef(res) {
      return res.list
    }
  })

  return { workshopList, machineTypeList }
}

export { useFilter }
