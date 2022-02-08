<template>
  <div class="form-group">
    <label for="">添加待办事项</label>
    <div class="row">
      <div class="col-8">
        <input type="text" class="form-control" v-model="inputValue" @keydown.enter="add">
      </div>
      <div class="col-4">
        <select class="form-control">
          <option value="">选择以过滤...</option>
          <option value="">待办中</option>
          <option value="">已完成</option>
          <option value="">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <div class="list-group">
    <ul class="list-group">
      <li class="list-group-item" v-for="item in todos" :key="item.id" @click="check(item)">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-checkinput"
            :id="item.id"
            :checked="item.state === TodoItemState.DONE"
            :disabled="item.state === TodoItemState.DELETE"
          >
          <label for="item.id">{{item}}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TodoItemState } from '@/common/const'
import { TodoItem } from '@/common/interface'
import store from '@/store'
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const inputValue = ref('')
    const add = () => {
      if (inputValue.value) {
        store.commit('add', inputValue.value)
        inputValue.value = ''
      }
    }
    const check = (item: TodoItem) => {
      store.commit('check', item.id)
    }
    return reactive({
      inputValue,
      add,
      todos: computed(() => store.state.todos),
      TodoItemState: TodoItemState,
      check
    })
  }
})
</script>

<style>

</style>
