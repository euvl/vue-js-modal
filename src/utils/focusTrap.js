const FOCUSABLE_ELEMENTS_QUERY =
  'button:not([disabled]), ' +
  'select:not([disabled]), ' +
  'a[href]:not([disabled]), ' +
  'area[href]:not([disabled]), ' +
  '[contentEditable=""]:not([disabled]), ' +
  '[contentEditable="true"]:not([disabled]), ' +
  '[contentEditable="TRUE"]:not([disabled]), ' +
  'textarea:not([disabled]), ' +
  'iframe:not([disabled]), ' +
  'input:not([disabled]), ' +
  'summary:not([disabled]), ' +
  '[tabindex]:not([tabindex="-1"])'

const isTabPressed = event => {
  return event.key === 'Tab' || event.keyCode === 9
}

const querySelectorAll = (element, selector) => {
  return [...(element.querySelectorAll(selector) || [])]
}

const queryFocusableElements = element => {
  return querySelectorAll(element, FOCUSABLE_ELEMENTS_QUERY)
}

const isFocused = element => {
  return element == document.activeElement
}

const isNothingFocused = () => {
  return !document.activeElement
}

class FocusTrap {
  constructor() {
    this.root = null
    this.elements = []

    this.onKeyDown = this.onKeyDown.bind(this)
    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)
    this.firstElement = this.firstElement.bind(this)
    this.lastElement = this.lastElement.bind(this)
  }

  lastElement() {
    return this.elements[this.elements.length - 1] || null
  }

  firstElement() {
    return this.elements[0] || null
  }

  onKeyDown(event) {
    if (!isTabPressed(event)) {
      return
    }

    // SHIFT + TAB
    if (event.shiftKey && isFocused(this.firstElement())) {
      this.lastElement().focus()
      event.preventDefault()
      return
    }

    // TAB
    if (isNothingFocused() || isFocused(this.lastElement())) {
      this.firstElement().focus()
      event.preventDefault()
      return
    }
  }

  enabled() {
    return !!this.root
  }

  enable(root) {
    if (!root) {
      return
    }

    this.root = root
    this.elements = queryFocusableElements(this.root)

    const firstElement = this.firstElement()

    if (firstElement) {
      firstElement.focus()
    }

    this.root.addEventListener('keydown', this.onKeyDown)
  }

  disable() {
    this.root.removeEventListener('keydown', this.onKeyDown)
    this.root = null
  }
}

export default FocusTrap
