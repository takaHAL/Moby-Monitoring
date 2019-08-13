<template>
  <div class="containerStatus-card">
    <p class="mb-10">{{ dockerData.title }}</p>
    <p v-if="dockerData.data === ''">
      <v-progress-circular
       indeterminate
       color="#8BC34A" />
    </p>
    <p v-else>{{ dockerData.data }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ContainerStatusCard extends Vue {
  @Prop() dockerData!: [string,number]
}
</script>
