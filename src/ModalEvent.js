import { generateId } from './utils'

function ModalEvent(properties = {}) {
  const id = generateId()
  const timestamp = Date.now()

  return {
    timestamp,
    id,
    canceled: false,
    ...properties
  }
}

export default ModalEvent
