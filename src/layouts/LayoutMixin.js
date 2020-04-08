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
    console.log('state is', this.layout, this.layout.bodyClass)
    return this.layout && this.layout.bodyClass
  }

  mounted () {
    this.emitChange()
  }

  emitChange () {
    this.$emit('change', {
      transforming: this.transforming,
      state: this.layout.code
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
      this.layout = target
    }
    const tl = gsap.timeline({
      onComplete: () => {
        // this.$refs.left.style = {}
        // this.$refs.right.style = {}
        // this.layout = target
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
