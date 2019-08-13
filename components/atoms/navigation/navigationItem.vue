<template>
  <nuxt-link :to="listContents.to" class="navigation-link">
    <!-- icon -->
    <v-list-tile-action class="navigation-item">
      <v-icon class="navigation-item__icon">{{ listContents.icon }}</v-icon>
    </v-list-tile-action>

    <!-- tooltip -->
    <div class="navigation-item__tooltip" v-if="mini">
      <span>{{ listContents.title }}</span>
    </div>

    <!-- title -->
    <v-list-tile-content>
      <v-list-tile-title>
        {{ listContents.title }}
      </v-list-tile-title>
    </v-list-tile-content>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class NavigationItem extends Vue {
  /**
   * @type {Tuple}
   */
  @Prop() listContents!: [string,string,string]
  @Prop() mini!: boolean
}
</script>

