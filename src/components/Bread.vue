<template>
  <b-breadcrumb :items="breadcrumb"/>
</template>

<script>
export default {
  name: 'Bread',
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  }
}
</script>
