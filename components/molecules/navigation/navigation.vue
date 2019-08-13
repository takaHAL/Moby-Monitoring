<template>
<v-navigation-drawer
 v-model="drawer"
 :mini-variant="mini"
 fixed
 width="220px"
 style="transform: translateX(0px);">
  <v-list class="navogation-list">
    <NavigationAction @miniMode="miniModeChange" />
    <v-list-tile v-for="item in items" :key="item.title" >
      <NavigationItem :listContents="item" :mini="mini" />
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  components: {
    NavigationItem : () => import('~/components/atoms/navigation/navigationItem.vue'),
    NavigationAction : () => import('~/components/atoms/navigation/navigationAction.vue'),
  }
})

export default class Navigation extends Vue {
  drawer: boolean = false
  mini: boolean = false
  right: null = null
  items: Array<object> = [
    { title: 'Dashboard', icon: 'dashboard', to: './dashboard' },
    { title: 'Logs', icon: 'subject', to: './logs' },
    { title: 'Network', icon: 'usb', to: './network' },
    { title: 'Setting', icon: 'settings', to: './setting' },
  ]

  @Emit('miniModeChange')
  miniModeChange(val: null): void {
    this.mini=!this.mini
  }
}

</script>

