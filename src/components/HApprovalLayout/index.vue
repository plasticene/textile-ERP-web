<template>
  <HPageView class="h-approval-temp" :spinning="spinning" :use-a-card="false">
    <template #title>
      <slot name="title"></slot>
    </template>
    <HSectionAnchor ref="anchor">
      <slot name="content"></slot>
      <HSection v-if="showHisTask" tag="a-card" title="审批流程记录">
        <!--      v-if="tasks.historyTasks.length > 0" -->
        <!-- 因为 node-line 不能根据 props 更新而更新故而需要加个 if 来判断挂载-->
        <slot name="approvalNodeLine" :tasks="tasks">
          <HApproveNodeLine
            v-if="tasks.historyTasks.length > 0"
            :data-source="tasks.historyTasks"
          />
        </slot>
      </HSection>
      <HSection v-if="isApproval" tag="a-card" title="审批">
        <slot name="approvalForm">
          <HApprovalForm
            ref="approval"
            :show-btn="false"
            has-turn-back
            v-bind="approvalForm"
            @submit="onSubmit"
          />
        </slot>
      </HSection>
    </HSectionAnchor>
    <HDetailFooter show-back>
      <a-button
        v-if="isApproval"
        type="primary"
        :loading="btnLoading"
        @click="onApproval()"
      >
        审批
      </a-button>
    </HDetailFooter>
    <HSignModal
      v-if="sign && isApproval"
      :visible="openSignModal"
      :loading="signLoading"
      @cancel="cancelSign"
      @submit="onApproval"
    />
  </HPageView>
</template>
<script name="HApprovalLayout" setup>
import { message } from 'ant-design-vue'
import { inject } from 'vue'

import { useRequest } from '@/hooks'
import { getHistoryTasks, getTasksInfo } from '@/services'

import HSignModal from '../HSignModal'

const props = defineProps({
  spinning: Boolean,
  btnLoading: Boolean,
  signLoading: Boolean,
  sign: {
    type: Boolean,
    default: false
  },
  /**
   * @description: 展示审批流程记录
   */
  showHisTask: {
    type: Boolean,
    default: true
  },
  beforeApproval: Function,
  getApprovalRef: Function,
  approvalForm: Object
})
const slots = useSlots()
const getApprovalInfo = inject('getApprovalInfo')

const { pageMode, processInstanceId } = getApprovalInfo()

const emits = defineEmits(['close', 'tasks-loaded'])
const route = useRoute()
const approval = ref(null)
const anchor = ref(null)
const openSignModal = ref(false)
const isApproval = computed(() => {
  return (pageMode || props.mode) === 'approval'
})

//  审批节点历史
//  根据页面是否是审批中还是已办 来请求不同的接口
// 也需要根据将getHistoryTasks 返回的数据进行包装 以统一数据结构
const { data: tasks } = useRequest(
  isApproval.value ? getTasksInfo : getHistoryTasks,
  {
    defaultData: {
      historyTasks: [],
      task: {},
      variables: {}
    },
    params: isApproval.value ? route.params.id : processInstanceId,
    beforeToRef(res) {
      const tasksObj = isApproval.value
        ? res
        : { historyTasks: res, task: {}, variables: {} }

      emits('tasks-loaded', toRaw(tasksObj))

      return tasksObj
    }
  }
)
// 取消数字签名
const cancelSign = () => {
  openSignModal.value = false
}
const onSubmit = form => {
  emits('submit', form)
}

const onApproval = async uuid => {
  // 插槽中的审批组件
  if (slots.approvalForm && props.getApprovalRef) {
    approval.value = props.getApprovalRef()
  }
  if (!approval.value) {
    message.error('审批组件未渲染')
    return
  }

  if (props.beforeApproval) {
    await props.beforeApproval()
  }

  anchor.value.scrollTo('last')
  if (props.sign && !uuid) {
    approval.value.form.validateFields(err => {
      if (!err) {
        openSignModal.value = true
      }
    })
  } else {
    approval.value.handleSubmit(uuid)
  }
}

defineExpose({ tasks, anchor, cancelSign })
</script>
