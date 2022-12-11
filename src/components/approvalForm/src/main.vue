<template>
  <div class="approval-from">
    <SectionTitle v-if="title" :title="title" />
    <a-form :form="form">
      <a-form-item
        :label="isReturn ? '操作' : '审批意见'"
        style="margin-bottom: 8px"
      >
        <a-radio-group
          v-decorator="['type', { rules: radioRules }]"
          @change="onRadioChange"
        >
          <a-radio
            v-for="radio in computedRadios"
            :key="radioConfig[radio].text"
            :value="radioConfig[radio].value"
          >
            {{ radioConfig[radio].text }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea
          v-decorator="['desc', { rules: descRules }]"
          placeholder="请输入说明！"
        />
      </a-form-item>

      <a-form-item v-if="showBtn">
        <a-button
          type="primary"
          class="mr-2x"
          :loading="loading"
          @click="handleSubmit()"
        >
          {{ loading ? '提交中...' : '提交' }}
        </a-button>
        <a-button @click="handleCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import SectionTitle from '@/components/sectionTitle'
import { radioConfig } from '@/utils/dict'
export default {
  name: 'HApprovalForm',
  components: { SectionTitle },
  props: {
    title: String,
    isReturn: Boolean,
    hasReject: { type: Boolean, default: true },
    loading: Boolean,
    hasTurnBack: Boolean,
    showBtn: { type: Boolean, default: true }
  },
  data() {
    this.radioConfig = radioConfig
    this.formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 3 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
    }

    return {
      form: this.$form.createForm(this, { name: 'approval-form' }),
      descIsRequired: true
    }
  },
  computed: {
    radios({ isReturn, hasTurnBack }) {
      return isReturn ? [4, 5] : hasTurnBack ? [1, 2, 3] : [1, 2]
    },
    computedRadios({ hasReject, radios }) {
      return hasReject ? radios : radios.filter(i => i !== 2)
    },
    radioRules({ isReturn }) {
      return [
        {
          required: true,
          message: isReturn ? '请选择操作' : '请选择审批意见！'
        }
      ]
    },
    descRules({ descIsRequired, isReturn }) {
      return [
        {
          required: descIsRequired,
          message: isReturn ? '请输入说明！' : '请输入审批说明！'
        }
      ]
    }
  },

  mounted() {},
  methods: {
    onRadioChange(e) {
      // 如果通过则不需要填写说明
      if (e.target.value == 1) {
        this.descIsRequired = false
      } else {
        this.descIsRequired = true
      }
      this.$emit('change', e.target.value)
    },
    handleSubmit(uuid) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', { signUuid: uuid, ...values })
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.ant-form-item-label > label) {
  color: #87a9cc;
}
</style>
