<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand d-flex align-item-center" href="#">
        <div class="logo mr-2"></div>
        <span>ToDoList</span>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/add">待办事项</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/done">已完成</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/delete">已删除</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '0',
  setup () {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    background: url(https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg) no-repeat center center;
    background-size: cover;
    width: 36px;
    height: 36px;
  }
</style>
