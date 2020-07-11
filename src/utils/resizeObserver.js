import ResizeObserverPolyfill from 'resize-observer-polyfill'

const observer =
  typeof window !== 'undefined' && window.ResizeObserver
    ? ResizeObserver
    : ResizeObserverPolyfill

export default observer
