import './index.less'

import { Col, Form, Row } from 'ant-design-vue'
// import { Button, Col, Form, Row, Space } from 'ant-design-vue'
import { v4 as uuid } from 'uuid'

// import HButton from '@/components/HButton'

const colBind = {
  props: { xs: 12, md: 8, xl: 6, xxl: 6 }
}
const HFilterComponent = {
  name: 'HFilterComponent',
  props: {
    formName: { type: String, default: 'filter-component-' + uuid() },
    value: { type: Object, default: () => ({}) },
    foldSize: { type: Number },
    size: { type: Number, default: 3 }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: this.formName,
        onValuesChange: (props, values) => {
          this.$emit('change', { ...this.form.getFieldsValue(), ...values })
        }
      }),
      showMore: false
    }
  },
  methods: {
    handleReset() {
      this.form.resetFields()
      const v = this.form.getFieldsValue()
      this.$emit('reset')
      this.$emit('change', v)
      this.$emit('submit', v)
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('submit', values)
        }
      })
    },
    handleToggle() {
      this.showMore = !this.showMore
    },
    renderItem(child, style) {
      return (
        <Col {...colBind} style={style}>
          <Form.Item>{child}</Form.Item>
        </Col>
      )
    }
    // renderBtn(showMore) {
    //   return (
    //     <HButton
    //       icon="double-right"
    //       class={
    //         showMore ? 'collapse-btn collapse-up' : 'collapse-btn collapse-down'
    //       }
    //       icon-only
    //       onClick={this.handleToggle}
    //     >
    //       {showMore ? '收起' : '展开'}
    //     </HButton>
    //   )
    // }
  },
  render() {
    const { foldSize, size, renderItem } = this
    // const { foldSize, size, renderItem, renderBtn } = this
    const collapseSize = foldSize || size
    const children = this.$slots.default.filter(c => c.tag)
    const isColl = children.length > collapseSize
    let cache = []
    if (isColl) {
      cache = children.splice(collapseSize, children.length + 1)
    }
    return (
      <Form class="filter-component" form={this.form}>
        <Row type="flex" gutter={24}>
          {children.map(child => {
            return renderItem(child, {})
          })}
          {cache.map(child => {
            return renderItem(child, {
              display: this.showMore ? 'block' : 'none'
            })
          })}
          {/* <Col {...colBind}>
            <Space style={{ height: '100%' }}>
              {isColl && renderBtn(this.showMore)}
              <Button icon="sync" onClick={this.handleReset}>
                重置
              </Button>
              <Button icon="search" type="primary" onClick={this.handleSubmit}>
                查询
              </Button>
            </Space>
          </Col> */}
        </Row>
      </Form>
    )
  }
}

export default HFilterComponent
