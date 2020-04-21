import ResizeObserverPolyfill from 'resize-observer-polyfill'

export default (window && window.ResizeObserver
  ? ResizeObserver
  : ResizeObserverPolyfill)
