import { TodoItem } from '@/common/interface'
import { createStore, Store } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { TodoItemState } from '@/common/const'
import { storage } from '@/common/utils'

const savePlugin = (store: Store<{
  todos: TodoItem[],
  item: TodoItem
}>) => {
  store.state.todos = storage.get()
  store.subscribe((mutation, state) => {
    storage.set(state.todos)
  })
}

export default createStore({
  state: {
    todos: [] as TodoItem[],
    item: {} as TodoItem
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
    },
    remove (state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)
      state.todos[index].state = TodoItemState.DELETE
    },
    clear (state, type: TodoItemState) {
      state.todos = state.todos.filter(todo => todo.state !== type)
    },
    saveEditItem (state, item: TodoItem) {
      state.item = item
    },
    update (state, item: TodoItem) {
      const index = state.todos.findIndex(todo => todo.id === item.id)
      state.todos[index] = item
    }

  },
  actions: {
  },
  modules: {
  },
  getters: {
    dones: state => state.todos.filter(todo => todo.state === TodoItemState.DONE),
    deletes: state => state.todos.filter(todo => todo.state === TodoItemState.DELETE),
    opens: state => state.todos.filter(todo => todo.state === TodoItemState.OPEN)
  },
  plugins: [savePlugin]
})
