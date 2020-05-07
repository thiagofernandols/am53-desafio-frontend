<template>
  <header class="header">
    <a :href="$routeDashboard.path" class="logo" v-if="!hideToggle">
      <img class="img-logo" src="@/assets/logo.png">
    </a>
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link :to="$routeDashboard.path">{{ title }}</router-link>
    </h1>
  </header>
</template>

<script>

export default {
  name: 'Header',
  props: {
    title: String,
    hideToggle: Boolean
  },
  computed: {
    icon () {
      return this.$store.state.isMenuVisible
        ? 'fa-angle-left'
        : 'fa-angle-down'
    }
  },
  methods: {
    toggleMenu () {
      this.$store.commit('toggleMenu')
    }
  }
}
</script>

<style>
.header {
  grid-area: header;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  z-index: 1032;
}

.title {
  font-size: 1.2rem;
  color: #000080;
  font-weight: 100;
  flex-grow: 1;
  text-align: left;
  padding-left: 20px;
}

.title a {
  color: #000080;
  text-decoration: none;
  font-weight: bold;
}

.title a:hover {
  color: #000080;
  text-decoration: none;
  font-weight: bold;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #000080;
  justify-self: flex-start;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  -webkit-box-shadow: 0 -1px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 -1px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 -1px 5px rgba(57, 63, 72, 0.3);
}

header.header > a.toggle:hover {
  color: #000080;
  background-color: #ededed;
}
header.header > a.logo {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;
  width: 140px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 1032;
}

header.header > a.logo:hover {
  color: #fff;
  background-color: #ededed;
}
.img-logo {
  max-width: 100%;
  height: 55px;
  padding-left: 40px
}
</style>
