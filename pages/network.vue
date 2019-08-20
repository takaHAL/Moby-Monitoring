<template>
  <div class="network">
    <containerInfo />
    <div class="dataTable">
      <dataTable />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    containerInfo: () => import('~/components/molecules/network/containerInfo.vue'),
    dataTable: () => import('~/components/atoms/network/dataTable.vue'),
  }
})
export default class ContainerChart extends Vue {}
</script>

<style lang="scss" scoped>
.dataTable{
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 3px;
}
</style>