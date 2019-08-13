<template>
  <v-list class="docker-container" one-line>
    <v-list-tile class="docker-container__list"
     v-for="items in containerDataList"
     :key="items.id"
     @click="toggle(items[0])" >
      <v-list-tile-content>
        <v-list-tile-title>{{ items[0][6] }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ items[0][6] }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-dialog v-model="dialog" width="500" height="600" >
      <v-card class="pr-20 pl-20">
        <v-list v-if="inspectData" six-line>

            <v-list-tile-content>
              <v-list-tile-title class="mt-10 mb-20">
                <h1 class="f-20">{{ containerName }}</h1>
              </v-list-tile-title>

              <v-list-tile-sub-title>Path: {{ inspectData[0].Path }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>State: {{ inspectData[0].State.Status }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>Platform: {{ inspectData[0].Platform }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>Gateway: {{ inspectData[0].NetworkSettings.Networks[networkName].Gateway }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>IPAdrress: {{ inspectData[0].NetworkSettings.Networks[networkName].IPAddress }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>MacAdrress: {{ inspectData[0].NetworkSettings.Networks[networkName].MacAddress }}</v-list-tile-sub-title>
            </v-list-tile-content>

        </v-list>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import axios from 'axios'

export default {
  data (){
    return {
      dialog: false,
      inspectData: null,
      containerName: ''
    }
  },
  props: {
    containerDataList: Array
  },
  methods :{
    async toggle ( item ){
      const id = item[6]
      const networkName = ''
      const url = `http://localhost:7000/containerInspect/${id}`
      this.inspectData = null
      this.dialog = true

      await axios.get(url)
      .then(res => {
        this.containerName = id
        this.inspectData = JSON.parse(res.data.result)
        this.networkName = this.inspectData[0].HostConfig.NetworkMode
      })
    }
  }
}

</script>
