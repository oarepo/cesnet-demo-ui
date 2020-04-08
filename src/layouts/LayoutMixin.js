import { Component, Vue } from 'vue-property-decorator'
import gsap from 'gsap'

export default @Component({
  props: {
    layout: Object,
    animateProps: Array
  }
})
class LayoutMixin extends Vue {
  transforming = false
  currentLayout = null

  colWidth (num) {
    return this.$q.screen.width * num / 12
  }

  style (target, name, duration = 1.5) {
    const bySize = target[this.$q.screen.name]
    const state = {
      ...(target[name] || {}),
      ...bySize[name]
    }
    return Object.keys(state).reduce((r, c) => {
      let dim = state[c]
      if (typeof dim === 'number') {
        dim = this.colWidth(dim)
      }
      r[c] = dim
      return r
    }, {
      duration
    })
  }

  get bodyClass () {
    return this.currentLayout && this.currentLayout.bodyClass
  }

  mounted () {
    this.currentLayout = this.layout
    this.emitChange()
  }

  emitChange () {
    this.$emit('change', {
      transforming: this.transforming,
      code: this.currentLayout.code
    })
  }

  transition (target, options) {
    options = {
      animate: true,
      timelineComplete: null,
      timelineStart: null,
      ...(options || {})
    }

    const {
      animate,
      timelineStart,
      timelineComplete
    } = options

    if (!animate) {
      this.currentLayout = target
    }
    const tl = gsap.timeline({
      onComplete: () => {
        // this.$refs.left.style = {}
        // this.$refs.right.style = {}
        this.currentLayout = target
        if (timelineComplete) {
          timelineComplete(tl)
        }
        this.transforming = false
        this.emitChange()
      }
    })
    tl.addLabel('start')
    this.animateProps.forEach(prop => {
      console.log(prop, typeof prop)
      let el
      let elName
      let pos
      if (typeof prop === 'object') {
        elName = prop.element
        pos = prop.position || 'start'
      } else {
        pos = 'start'
        elName = prop
      }
      el = this.$refs[elName]
      if (el.$el) {
        el = el.$el
      }
      tl.to(el, this.style(target, elName), pos)
    })
    if (timelineStart) {
      timelineStart(tl)
    }
    this.transforming = true
    this.emitChange()
  }
}
