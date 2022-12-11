<template>
  <div class="icon-box" v-on="$listeners">
    <svg
      :class="getClassName"
      :style="{
        width: computedSize.width,
        height: computedSize.height,
        color: color
      }"
      aria-hidden="true"
    >
      <slot>
        <use :xlink:href="iconName" />
      </slot>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    size: {
      type: [String, Number]
    },
    color: {
      type: String,
      default: 'var(--icon-color,#000)'
    }
  },
  computed: {
    iconName({ name }) {
      return `#icon-${name}`
    },
    getClassName({ name }) {
      return ['hccwp-svg-icon', `hccwp-svg-icon__${name}`]
    },
    computedSize({ size, width, height }) {
      if (size) {
        return { width: size, height: size }
      } else {
        return { width: width, height: height }
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.hccwp-svg-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
.hccwp-icon {
  font-size: 0;
}
</style>
