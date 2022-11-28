import { v1 as uuid } from 'uuid'

export class TodoItem {
  uuid: string = uuid()
  text: string = ''
  done: boolean = false

  constructor (text = '', done = false) {
    this.text = text
    this.done = done
  }
}
