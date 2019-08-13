<template>
  <div class="containerChart-header">
    <h1 class="containerChart-title">{{ title }}</h1>
    <v-spacer />
    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ContainerChartHeader extends Vue {
  @Prop() title!: string
}
</script>

