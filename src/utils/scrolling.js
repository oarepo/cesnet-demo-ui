import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

// Scrolls to a DOM element position
export function scrollToElement (el) {
  const target = getScrollTarget(el)
  const offset = el.offsetTop - 25
  const duration = 500
  setScrollPosition(target, offset, duration)
}
