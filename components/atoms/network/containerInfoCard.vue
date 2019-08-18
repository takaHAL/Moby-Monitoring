<template>
  <div class="containerInfo-card"
   :style="`background: ${info.color};`">
    <h1>{{ info.title }}:</h1>
    <div class="containerInfo-card__data">{{ info.data }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ContainerInfoCard extends Vue {
  @Prop() info!: object
}
</script>