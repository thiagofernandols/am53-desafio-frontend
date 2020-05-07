<template>
  <div class='content'>
    <Bread />
    <router-view></router-view>
  </div>
</template>

<script>
import Bread from './Bread'
export default {
  name: 'Content',
  components: { Bread }
}
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef80;
  padding: 20px;
  overflow-x: hidden;
}
</style>
