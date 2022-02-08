import { TodoItem } from '@/common/interface'
import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { TodoItemState } from '@/common/const'

export default createStore({
  state: {
    todos: [] as TodoItem[]
  },
  mutations: {
    add (state, value) {
      state.todos.push({
        id: uuidv4(),
        text: value,
        state: TodoItemState.OPEN
      })
    },
    check (state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)
      state.todos[index].state = state.todos[index].state === TodoItemState.DONE ? TodoItemState.OPEN : TodoItemState.DONE
    }
  },
  actions: {
  },
  modules: {
  }
})
