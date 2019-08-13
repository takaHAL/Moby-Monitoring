<template>
<v-layout>
  <v-data-table
    :headers="headers"
    :items="containerDataTable"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td @click="toggle(props.item[0][0])" class="text-xs-left">{{ props.item[0][0] }}</td>
      <td @click="toggle(props.item[0][0])" class="text-xs-left" v-if="props.item[0][1].match(/Up/)">Up</td>
      <td @click="toggle(props.item[0][0])" class="text-xs-left" v-else>Down</td>
      <td @click="toggle(props.item[0][0])" class="text-xs-left">{{ props.item[0][4] }}</td>
      <td @click="toggle(props.item[0][0])" class="text-xs-left">{{ props.item[0][3] }}</td>
    </template>
  </v-data-table>

  <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500" max-height="600" >
      <v-card width="500" >
        <v-container class="text-xs-center">
          
          <v-progress-circular class="mt-50" v-if="inspectData.length == 0" indeterminate color="primary" />
          <v-container v-else class="dialog-content__wrap">
            <div class="dialog-title mb-20">{{ containerName }}</div>       
            <div v-for="items in inspectData" :key="items.index" class="dialog-content">
              <div class="dialog-content__left">{{ items.name }}</div>
              <div class="dialog-content__right">{{ items.val }}</div>
            </div>
          </v-container>
         
        </v-container>

      </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Container Name',
          align: 'left',
          value: 'name',
          sortable: false,
        },
        { text: 'status', value: 'status', sortable: false },
        { text: 'port', value: 'port', sortable: false },
        { text: 'running', value: 'running', sortable: false }
      ],
      dialog: false,
      inspectData: [],
      inspectPath: "",
      inspectPlatform: "",
      inspectNetwork: [],
      containerName: '',
    }
  },
  props: {
    containerDataTable: Array
  },
  methods :{
    async toggle ( item ){
      const id = item
      const url = `http://localhost:7000/containerInspect/${id}`
      this.inspectData = []
      this.dialog = true

      await axios.get(url)
      .then(res => {
        const inspectData = JSON.parse(res.data.result)[0]
        const networkName = inspectData.HostConfig.NetworkMode
 
        this.containerName = id
        this.inspectData.push({name: 'Path',val: inspectData.Path})
        this.inspectData.push({name: 'Platform',val: inspectData.Platform})
        this.inspectData.push({name: 'Gateway',val: inspectData.NetworkSettings.Networks[networkName].Gateway})
        this.inspectData.push({name: 'IPAdress',val :inspectData.NetworkSettings.Networks[networkName].IPAddress})
        this.inspectData.push({name: 'MacAddress', val: inspectData.NetworkSettings.Networks[networkName].MacAddress})
      })
    }
  }
}

</script>

<style>
.elevation-1{
  width: 640px;
}
.v-datatable thead th,
.v-datatable tbody tr td{
  vertical-align: middle;
}
.v-progress-circular{
  margin: 0 auto;
}
</style>