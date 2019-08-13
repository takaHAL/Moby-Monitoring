<template>
  <div class="containerStatus">
    <containerStatusCard
     v-for="item in dockerData" 
     :key="item.id"
     :dockerData="item"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    containerStatusCard : () => import('~/components/atoms/dashboard/containerStatusCard.vue')
  }
})

export default class ContainerStatu extends Vue {
  private dockerData: {title: string,data: any}[] = [
    {title: 'Total Container',data: ''},
    {title: 'Running Container',data: ''},
    {title: 'Stopped Container',data: ''},
    {title: 'Paused Container',data: ''},
    {title: 'Active Container',data: ''},
    {title: 'Total Container Size',data: ''},
    {title: 'Container Reclaimable',data: ''},
    {title: 'Total Image',data: ''},
    {title: 'Active Image',data: ''},
    {title: 'Total Image Size',data: ''},
    {title: 'Image Reclaimable',data: ''},
    {title: 'Total Local Volumes',data: ''},
    {title: 'Active Local Volumes',data: ''},
    {title: 'Total Local Volumes',data: ''},
    {title: 'Local Volumes Reclaimable',data: ''},
  ]

  private created(){
    axios.get("http://localhost:7000/containerStatus")
    .then(res => {
      this.dockerData.forEach((val,index) => {
        val.data = res.data.dockerData[index]
      })
    })
  }
}
</script>
