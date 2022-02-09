<template>
  <div class="form-group">
    <label>添加待办事项</label>
    <div class="row">
      <div class="col-8">
        <input type="text" class="form-control" v-model="inputValue" @keydown.enter="add" />
      </div>
      <div class="col-4">
        <select class="form-control" v-model="filterState">
          <option :value="TodoItemState.ALL">选择以过滤...</option>
          <option :value="TodoItemState.OPEN">待办中</option>
          <option :value="TodoItemState.DONE">已完成</option>
          <option :value="TodoItemState.DELETE">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <div class="list-group">
    <ul class="list-group">
      <li
        class="list-group-item d-flex align-items-center justify-content-between"
        v-for="item in todos"
        :key="item.id"
        @click="check(item)"
      >
        <div class="form-check">
          <input
            type="checkbox"
            class="form-checkinput mr-2"
            :id="item.id"
            :checked="item.state === TodoItemState.DONE"
            :disabled="item.state === TodoItemState.DELETE"
          />
          <label
            for="item.id"
            class="form-label user-select-none"
            :class="{'text-black-50 line-through': item.state === TodoItemState.DONE }"
          >{{item.text}}</label>
        </div>
        <div class="float-right ctrls" :class="{'d-none': item.state !== TodoItemState.OPEN}">
          <button class="btn btn-warning btn-sm mr-2 text-light" @click.stop="edit(item)">编辑</button>
          <button class="btn btn-danger btn-sm" @click.stop="remove(item)">删除</button>
        </div>
      </li>
    </ul>
  </div>
  <button
    class="btn btn-danger float-right mt-4"
    @click="hide"
  >{{filterState === TodoItemState.OPEN ? '显示所有' : '显示已完成'}}</button>
</template>

<script lang="ts">
import { TodoItemState } from '@/common/const'
import { TodoItem } from '@/common/interface'
import router from '@/router'
import store from '@/store'
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const inputValue = ref('')
    const filterState = ref(TodoItemState.ALL)
    const add = () => {
      if (inputValue.value) {
        store.commit('add', inputValue.value)
        inputValue.value = ''
      }
    }
    const check = (item: TodoItem) => {
      if (item.state !== TodoItemState.DELETE) {
        store.commit('check', item.id)
      }
    }
    const remove = (item: TodoItem) => {
      store.commit('remove', item.id)
    }
    const edit = (item: TodoItem) => {
      store.commit('saveEditItem', item)
      router.push({ name: 'edit' })
    }
    const filterItem = (value: TodoItemState) => {
      if (value === TodoItemState.ALL) {
        return store.state.todos
      }
      return store.state.todos.filter(item => item.state === value)
    }
    const hide = () => {
      if (filterState.value === TodoItemState.OPEN) {
        filterState.value = TodoItemState.ALL
      } else {
        filterState.value = TodoItemState.OPEN
      }
    }
    return reactive({
      inputValue,
      todos: computed(() => filterItem(filterState.value)),
      TodoItemState: TodoItemState,
      add,
      check,
      remove,
      edit,
      filterState,
      hide
    })
  }
})
</script>

<style lang="scss" scoped>
.line-through {
  text-decoration: line-through;
}
.list-group-item {
  &:hover {
    .ctrls {
      display: block;
    }
  }
  .ctrls {
    display: none;
  }
}
</style>
