import { generateId } from '.'

class ModalEvent {
  constructor(properties = {}) {
    this.timestamp = Date.now()
    this.id = generateId()

    Object.keys(properties).forEach(key => {
      this[key] = properties[key]
    })
  }
}

export default ModalEvent
