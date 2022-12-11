import './index.less'

import { Dropdown, Icon, Menu, Space } from 'ant-design-vue'
const HCollapseBtn = {
  name: 'HCollapseBtn',
  props: { size: { type: Number, default: 2 } },
  render() {
    const { size } = this
    const children = this.$slots.default?.filter(c => c.tag) || []
    const isColl = children.length > size
    let cache = []
    if (isColl) {
      cache = children.splice(size, children.length + 1)
    }

    return (
      <Space class="h-collapse-btn">
        {children}

        {isColl && (
          <Dropdown overlayClassName="table-action-dropdown">
            <div class="collapse-trigger">
              <Icon
                type="ellipsis"
                style={{
                  fontSize: '16px',
                  color: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              />
            </div>

            <Menu slot="overlay" class="h-collapse-menu">
              {cache.map(c => {
                return <Menu.Item>{c}</Menu.Item>
              })}
            </Menu>
          </Dropdown>
        )}
      </Space>
    )
  }
}

export default HCollapseBtn
