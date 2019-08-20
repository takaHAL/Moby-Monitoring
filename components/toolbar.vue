<template>
  <v-toolbar fixed app class="nav" height="60px" color="#8BC34A" >
    <v-toolbar-title class="white-text" v-text="title" />
    <v-spacer />
    <!--
    <v-icon class="mr-20">get_app</v-icon>
    <v-icon>help</v-icon>
    -->
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      title: 'Chieri Monitoring',
    }
  },
}
</script>