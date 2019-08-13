<template>
  <v-list-tile class="navigation-action mb-10 pb-5">
    <v-spacer />
    <v-btn icon @click.stop="miniMode" >
      <v-icon size="30">chevron_left</v-icon>
    </v-btn>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class NavigationAction extends Vue {
  @Emit('miniMode')
  miniMode(val: null): void {}
}
</script>

