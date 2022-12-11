<template>
  <a-affix
    class="md-toc"
    :offset-top="100"
    :target="getTarget"
    style="width: 156px"
  >
    <ul>
      <li
        v-for="(slide, index) in slides"
        :key="slide.id"
        :class="`tag-${slide.tagName} slide ${
          activeIndex == index ? 'is-active' : ''
        }`"
        @click="handleClick(slide, index)"
      >
        {{ slide.innerText }}
      </li>
    </ul>
  </a-affix>
</template>

<script>
export default {
  name: 'MdToc',
  data() {
    return {
      slides: [],
      activeIndex: 0,
      getTarget: () => document.querySelector('#popContainer')
    }
  },

  activated() {
    this.renderSlide()
  },

  methods: {
    async renderSlide() {
      if (this.slides.length > 0) {
        return
      }

      document
        .querySelector('#popContainer')
        .removeEventListener('scroll', this.watcherScroll)
      await this.$nextTick()
      await this.animate()
      const mdBody = document.querySelector('.markdown-body')
      const titleList = mdBody.querySelectorAll('h2,h3,h4,h5,h6')

      this.slides = Array.from(titleList)
      document
        .querySelector('#popContainer')
        .addEventListener('scroll', this.watcherScroll)
      this.watcherScroll()
    },
    handleClick(slideDom, index) {
      this.activeIndex = index
      slideDom.scrollIntoView({
        behavior: 'smooth'
        // block: 'center'
      })
    },
    watcherScroll(e) {
      if (!e) return
      const defaultTop = this.slides[0].offsetTop

      const index = this.slides.findIndex(element => {
        return e.target.scrollTop + defaultTop < element.offsetTop
      })
      // console.log(index)
      if (index + 1 > 1) {
        // console.log(index - 1)

        this.activeIndex = index - 1
      } else {
        // console.log(index + 1)
        this.activeIndex = index + 1
      }
    },
    animate() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.md-toc {
  position: absolute;
  top: 70px;
  right: 20px;

  // position: fixed;
  // right: 0;
  // top:
  ul {
    padding-left: 0;
    right: 20px;
    width: 156px;
  }
}
.slide {
  display: block;
  padding-left: 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.65);
  white-space: nowrap;
  text-overflow: ellipsis;
  border-left: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  &:hover {
    color: rgb(24, 144, 255);
  }
  &.is-active {
    color: rgb(24, 144, 255);
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 4px;
      background-color: rgb(24, 144, 255);
      position: absolute;
      left: 8px;
      top: 9px;
    }
  }
}
.tag-H2 {
  padding-left: 16px;
}
.tag-H3 {
  padding-left: 24px;
}
.tag-H4 {
  padding-left: 32px;
}
.tag-H5 {
  padding-left: 40px;
}
.tag-H6 {
  padding-left: 48px;
}
</style>
