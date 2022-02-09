import store from '@/store'
import { TodoItemState } from './const'

export const utils = () => {
  const clear = (type: TodoItemState) => {
    store.commit('clear', type)
  }
  return {
    clear,
    TodoItemState
  }
}
