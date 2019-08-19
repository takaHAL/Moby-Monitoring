<template>
  <div class="containerInfo">
    <containerInfoCard v-for="item in containerInfo"
     :key="item.id"
     :info="item" />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    containerInfoCard: () => import('~/components/atoms/network/containerInfoCard.vue'),
  }
})
export default class ContainerInfo extends Vue {
  private containerInfo: {title: string,data: string,color: string}[] = [
    { title: 'OSType', data: '', color: '#D81B60' },
    { title: 'OperationSystem', data: '', color: '#039BE5' },
    { title: 'KernelVersion', data: '', color: '#F9A825' },
    { title: 'ServerVersion', data: '', color: '#F9CA24' },
    { title: 'HttpProxy', data: '', color: '#43A047' },
    { title: 'HttpsProxy', data: '', color: '#8E24AA' }
  ]

  private mounted(){
    const self = this
    axios.get("http://localhost:7000/dockerInfo")
    .then(res => {
      self.containerInfo.forEach((val,index) => {
        val.data = res.data.info[index]
      })
    })
  }
}
</script>