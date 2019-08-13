<template>
  <div class="dashboard">
    <ContainerStatus />
    <ContainerChart />
  </div>
</template>

<script>
import ContainerStatus from '~/components/molecules/dashboard/containerStatus'
import ContainerChart from '~/components/organisms/containerChart'

export default {
  components: {
    ContainerChart,
    ContainerStatus
  },
}
</script>
