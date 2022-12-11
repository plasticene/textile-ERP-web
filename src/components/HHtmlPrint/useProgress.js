import { notification } from 'ant-design-vue'
import { v4 as uuid } from 'uuid'

function useProgress(props) {
  const progress = ref(0)
  const printKey = uuid()
  const options = {
    key: printKey,
    message: 'pdf生成中',
    placement: 'bottomRight',
    description: () => (
      <a-progress size="small" status="active" percent={progress.value} />
    )
  }
  const openNotification = () => {
    notification.open({
      ...options,
      message: `${props.message || props.fileName}生成中...`,
      icon: () => <a-icon type="loading" style="color: #108ee9" />
    })
  }

  const updateNotification = () => {
    notification.open({
      ...options,
      message: `${props.message || props.fileName}生成成功！`,
      icon: () => (
        <a-icon
          type="check-circle"
          theme="filled"
          style="color:var(--success-color)"
        />
      ),
      onClose() {
        progress.value = 0
      }
    })
  }

  return { progress, openNotification, updateNotification }
}

export default useProgress
