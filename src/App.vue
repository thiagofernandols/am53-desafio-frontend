<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible }">
    <Loading :active.sync="this.$store.state.preload" :is-full-page="true" :width="45" :color="'#007bff'"/>
    <Header title="Desafio Técnico - Thiago Lôbo" />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(['isMenuVisible']),
  created () {
    if (this.$mq === 'xs' || this.$mq === 'sm') {
      this.$store.commit('toggleMenu', false)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 20px;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

.b-table-empty-row {
  text-align: center;
}

.vs__dropdown-toggle {
  height: 38px!important;
}

</style>
