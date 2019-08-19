<template>
  <div class="containerChart">
<!--
    <containerCpu />
    <containerMemory />
    <containerSent />
    <containerRecived />
-->
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    containerCpu: () => import('~/components/molecules/dashboard/containerCpuChart.vue'),
    containerMemory: () => import('~/components/molecules/dashboard/containerMemoryChart.vue'),
    containerSent: () => import('~/components/molecules/dashboard/containerSentChart.vue'),
    containerRecived: () => import('~/components/molecules/dashboard/containerRecivedChart.vue')
  }
})

export default class ContainerChart extends Vue {}
</script>
