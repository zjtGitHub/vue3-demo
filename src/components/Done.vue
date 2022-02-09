<template>
  <ul class="list-group">
    <li
      class="list-group-item d-flex align-items-center justify-content-between"
      v-for="item in dones"
      :key="item.id"
    >{{item.text}}</li>
  </ul>
  <button
    class="btn btn-danger float-right mt-4"
    type="button"
    @click="clear(TodoItemState.DONE)"
  >清除所有</button>
</template>

<script lang="ts">
import { utils } from '@/common/utils'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  setup () {
    const { clear, TodoItemState } = utils()
    return { clear, TodoItemState }
  },
  computed: {
    ...mapGetters(['dones'])
  }
})
</script>

<style scoped>
</style>
