<template>
  <div class="draggableTable">
    <div class="draggableTable__thead">
      <div
        v-for="item in columns"
        :key="item.key"
        class="draggableTable__th"
        :style="{
          width:
            !isNaN(parseFloat(item.width)) && isFinite(item.width)
              ? item.width + 'px'
              : item.width,
          flex:
            !isNaN(parseFloat(item.width)) && isFinite(item.width)
              ? item.width
              : undefined
        }"
      >
        {{ item.title }}
      </div>
    </div>
    <Draggable
      v-bind="dragOptions"
      handle=".handle"
      tag="div"
      class="draggableTable__tbody"
      :list="dataSource"
      @change="handleMove($event, -1)"
    >
      <DragTr
        v-for="record in dataSource"
        :id="id"
        :key="record[id]"
        class="handle"
        :record="record"
        :columns="columns"
        :drag-options="dragOptions.childrenOpt"
        @change="handleMove"
      >
        <!-- <template> -->
        <!-- <slot name="action" :record="record"></slot> -->
        <template
          v-for="item in columns"
          v-slot:[item.scopedSlots?.customRender]="{ record }"
        >
          <slot
            :name="item.scopedSlots.customRender"
            :record="record"
            :text="record[item.dataIndex]"
          ></slot>
          <!-- </template> -->
        </template>
      </DragTr>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

import DragTr from './components/DragTr'
export default {
  name: 'DraggableTable',
  components: {
    Draggable,
    DragTr
  },
  props: {
    columns: Array,
    dataSource: Array,
    id: {
      type: String,
      default: 'id'
    },
    dragOptions: {
      type: Object,
      default: () => ({
        animation: 500,
        disabled: false,
        ghostClass: 'ghost'
      })
    }
  },
  provide() {
    return {}
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  beforeDestroy() {},
  methods: {
    handleMove(e) {
      console.log(11111, e)
      console.log(22222, this.dataSource)
      if (e.removed) {
        // 跨父级拖拽会触发两次change：removed和added，只需要更新一次即可
        return
      }
      this.$emit('change', this.dataSource)
    }
  }
}
</script>

<style scoped lang="less">
.draggableTable {
  width: 100%;
  &__thead {
    display: flex;
    color: var(--primary-orange);
    font-weight: 700;
    font-size: 15px;
    background: rgb(250, 250, 250);
    padding: 16px;
  }
  &__tbody {
    padding-bottom: 16px;
    // background: rgba(207, 227, 248, 0.2);
  }
  &__th {
    min-width: 80px;
  }
}
</style>
