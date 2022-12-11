<template>
  <a-form :form="form" class="form" @submit="handleSubmit">
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('name')">
          <a-input
            v-decorator="[
              'repository.name',
              {
                rules: [
                  {
                    required: true,
                    message: $ta('input|name'),
                    whitespace: true
                  }
                ]
              }
            ]"
            :placeholder="$ta('input|name')"
          />
        </a-form-item>
      </a-col>
      <a-col
        :xl="{ span: 6, offset: 2 }"
        :lg="{ span: 8 }"
        :md="{ span: 12 }"
        :sm="24"
      >
        <a-form-item :label="$t('domain')">
          <a-input
            v-decorator="[
              'repository.domain',
              {
                rules: [
                  {
                    required: true,
                    message: $ta('input|domain'),
                    whitespace: true
                  },
                  { validator: validate }
                ]
              }
            ]"
            addon-before="http://"
            addon-after=".github.io"
            :placeholder="$ta('input|domain')"
          />
        </a-form-item>
      </a-col>
      <a-col
        :xl="{ span: 8, offset: 2 }"
        :lg="{ span: 10 }"
        :md="{ span: 24 }"
        :sm="24"
      >
        <a-form-item :label="$t('manager')">
          <a-select
            v-decorator="[
              'repository.manager',
              { rules: [{ required: true, message: $ta('select|manager') }] }
            ]"
            :placeholder="$ta('select|manager')"
          >
            <a-select-option value="王同学">王同学</a-select-option>
            <a-select-option value="李同学">李同学</a-select-option>
            <a-select-option value="黄同学">黄同学</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('approval')">
          <a-select
            v-decorator="[
              'repository.auditor',
              { rules: [{ required: true, message: $ta('select|approval') }] }
            ]"
            :placeholder="$ta('select|approval')"
          >
            <a-select-option value="王晓丽">王晓丽</a-select-option>
            <a-select-option value="李军">李军</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col
        :xl="{ span: 6, offset: 2 }"
        :lg="{ span: 8 }"
        :md="{ span: 12 }"
        :sm="24"
      >
        <a-form-item :label="$t('date')">
          <a-range-picker
            v-decorator="[
              'repository.effectiveDate',
              { rules: [{ required: true, message: $ta('select|date') }] }
            ]"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col
        :xl="{ span: 8, offset: 2 }"
        :lg="{ span: 10 }"
        :md="{ span: 24 }"
        :sm="24"
      >
        <a-form-item :label="$t('type')">
          <a-select
            v-decorator="[
              'repository.type',
              { rules: [{ required: true, message: $ta('select|type') }] }
            ]"
            :placeholder="$ta('select|type')"
          >
            <a-select-option value="公开">公开</a-select-option>
            <a-select-option value="私密">私密</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'RepositoryForm',
  props: ['showSubmit'],
  i18n: require('./i18n-repository'),
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    validate(rule, value, f) {
      if (value !== undefined && value !== 'iczer') {
        f("输入'iczer'试下？")
      }
      f()
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  .form-row {
    margin: 0 -8px;
  }
  .ant-col-md-12,
  .ant-col-sm-24,
  .ant-col-lg-6,
  .ant-col-lg-8,
  .ant-col-lg-10,
  .ant-col-xl-8,
  .ant-col-xl-6 {
    padding: 0 8px;
  }
}
</style>
