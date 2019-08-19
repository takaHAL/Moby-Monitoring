<template>
  <div>
    <v-tabs color="#8BC34A">
      <v-tab>Network</v-tab>
      <v-tab>Config</v-tab>

      <v-tab-item>
        <ul class="detailsDialog-list">
          <li>IPAddress: {{ networkData.ipaddress }}</li>
          <li>GlobalIPv6Address: {{ networkData.ipv6address }}</li>
          <li>Gateway: {{ networkData.gateway }}</li>
          <li>IPv6Gateway: {{ networkData.ipv6gateway }}</li>
          <li>MacAddress: {{ networkData.macaddress }}</li>
        </ul>
      </v-tab-item>
      <v-tab-item>
        <ul class="detailsDialog-list">
          <li>Cmd: {{ configData.cmd }}</li>
          <li>Env: {{ configData.env }}</li>
          <li>Image: {{ configData.image }}</li>
          <li>Hostname: {{ configData.hostname }}</li>
          <li>Volumes: {{ configData.volumes }}</li>
        </ul>
      </v-tab-item>
    </v-tabs>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class DetailsDialog extends Vue {
  @Prop() id!: string
  private tab: any = null
  private tabMenu: string[] = ['NetworkSettings','Config']
  private configData: object[] = []
  private networkData: object[] = []

  private created(){
    const self = this
    axios.get("http://localhost:7000/detailsDialog/"+this.id)
    .then(res => {
      self.networkData = res.data.network
      self.configData = res.data.config
    })
  }
}
</script>
