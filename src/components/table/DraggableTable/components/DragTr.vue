<template>
  <div class="draggableTr">
    <div class="draggableTr__tr">
      <div
        v-for="(item, index) in columns"
        :key="item.key"
        class="draggableTr__td"
        :style="{
          width:
            !isNaN(parseFloat(item.width)) && isFinite(item.width)
              ? item.width + 'px'
              : item.width,
          flex:
            !isNaN(parseFloat(item.width)) && isFinite(item.width)
              ? item.width
              : undefined,
          marginLeft: index === 0 ? `${level * 16}px` : '0px',
          marginRight: index === 0 ? `-${level * 16}px` : '0px'
        }"
      >
        <template
          v-if="index === 0 && record.children && record.children.length"
        >
          <a-icon
            v-if="!showChildren"
            type="plus-square"
            class="draggableTr__icon"
            @click="handleShowChildren(true)"
          />
          <a-icon
            v-else
            type="minus-square"
            class="draggableTr__icon"
            @click="handleShowChildren(false)"
          />
        </template>
        <div
          v-else-if="index === 0"
          class="draggableTr__icon draggableTr__icon--empty"
        ></div>
        <slot
          v-if="item.scopedSlots && item.scopedSlots.customRender"
          :name="item.scopedSlots.customRender"
          :record="record"
          :text="record[item.dataIndex]"
        ></slot>
        <template v-else>{{ record[item.dataIndex] }}</template>
      </div>
    </div>
    <!--
    <Draggable
      v-if="record.children && record.children.length && showChildren" -->

    <Draggable
      v-if="record.children && showChildren"
      class="draggableTr__children"
      v-bind="dragOptions"
      handle=".handle"
      tag="div"
      :list="record.children"
      @change="handleMove"
    >
      <DragTr
        v-for="ele in record.children"
        :id="id"
        :key="ele[id]"
        class="handle"
        :record="ele"
        :columns="columns"
        :level="level + 1"
        :drag-options="dragOptions"
      >
        <template
          v-for="item in columns"
          v-slot:[item.scopedSlots?.customRender]="{ text, record: r }"
        >
          <slot
            :name="item.scopedSlots.customRender"
            :record="r"
            :text="text"
          ></slot>
        </template>
      </DragTr>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
  name: 'DragTr',
  components: {
    Draggable
  },
  props: {
    columns: Array,
    record: Object,
    id: {
      type: String,
      default: 'id'
    },
    level: {
      type: Number,
      default: 0
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
    return {
      showChildren: true
    }
  },
  computed: {},
  created() {},
  beforeDestroy() {},
  methods: {
    handleMove(e) {
      console.log(33333, e)
      console.log(44444, this.dataSource)
      this.$emit('change', e)
    },
    handleShowChildren(show) {
      this.showChildren = show
    }
  }
}
</script>

<style scoped lang="less">
.draggableTr {
  width: 100%;
  // background: rgba(207, 227, 248, 0.2);
  &__tr {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid var(--color-border-1);
    &:hover {
      background: var(--color-fill-1);
    }
  }

  &__td {
    display: flex;
    align-items: center;
    min-width: 80px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }

  &__icon {
    cursor: pointer;
    margin-right: 8px;
    width: 16px;
    height: 16px;
    font-size: 16px;
    display: inline-block;
    color: var(--color-text-3);
    &--empty {
      cursor: grab;
    }
  }
}
</style>
