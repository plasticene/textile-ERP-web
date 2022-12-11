import { createLocalVue, mount } from '@vue/test-utils'
import Antd, { Input } from 'ant-design-vue'

import { InputBankNumber } from '@/components/input'
const localVue = createLocalVue()

localVue.use(Antd)

describe('测试 InputBankNumber 组件实例', () => {
  // 创建一个包含被挂载和渲染的 Vue 组件的 Wrapper
  const wrapper = mount(InputBankNumber, { localVue })
  const { element } = wrapper
  it('测试 Value Props', async () => {
    // 在创建的时候修改了 props 中 value 的值
    await wrapper.setProps({ value: '6217001210024455220' })

    const input = element.querySelector('input')
    const cardInfo = element.querySelector('.card-info')
    expect(input.value).toBe('6217 0012 1002 4455 220')
    expect(cardInfo.innerHTML).toBe('\n    中国建设银行 储蓄卡\n  ')
  })

  it('测试 Default Value Props', async () => {
    await wrapper.setProps({ defaultValue: '6217001210024455220' })
    const input = element.querySelector('input')
    const cardInfo = element.querySelector('.card-info')
    expect(input.value).toBe('6217 0012 1002 4455 220')
    expect(cardInfo.innerHTML).toBe('\n    中国建设银行 储蓄卡\n  ')
  })

  it('测试 input 输入', async () => {
    const wrapper = mount(InputBankNumber, { localVue })
    const textInput = wrapper.find('input')
    textInput.element.value = '6217001210024455221'
    const inputWrapper = wrapper.findComponent(Input)
    inputWrapper.vm.$emit('change', {
      target: { value: '6217001210024455221' }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.number).toBe('6217 0012 1002 4455 221')
  })

  it('测试 Separator Props', async () => {
    const wrapper = mount(InputBankNumber, {
      localVue,
      propsData: {
        value: '6217001210024455220',
        separator: '-'
      }
    })
    const input = wrapper.element.querySelector('input')
    expect(input.value).toBe('6217-0012-1002-4455-220')
  })
})
