<template>
  <footer class="footer">
    <b-container fluid>
      <b-row align-h="between">
        <b-col sm="12" md="2" class="text-left"></b-col>
        <b-col sm="12" md="4" class="text-right">&copy; Copyrigth 2020</b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>

export default {
  name: 'Footer'
}
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #d9d9d9;
  display: flex;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0px 10px;
  flex-shrink: 0;
  padding-right: 10px;
}
</style>
