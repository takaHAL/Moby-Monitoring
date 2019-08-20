<template>
  <div class="logs">

    <div class="logs-left">
      <v-data-table
       :headers="headers"
       :items="containerList"
       class="network-dataTable" >
        <template v-slot:items="props">
          <td @click="containerSelect(props.item)"
           style="width: 100%;">{{ props.item }}
          </td>
        </template>
      </v-data-table>
    </div>

    <div class="logs-right">
      <v-text-field
       label="log search"
       v-model="keyword" />
      <ul class="logs-display">
        <li v-for="log in filteredLogs" v-bind:key="log" >
          <pre>{{ log }}</pre>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'logs',
  data (){
    return {
      keyword:'',
      selectContainer:null,
      containerList: [],
      logs: null,
      headers: [
        {
          text: 'Container Name',
          sortable: false,
          value: 'name'
        },
      ]
    }
  },
  created(){
    axios.get("http://localhost:7000/containerList")
    .then(res => {
      const containerList = unescape(res.data.result)
      this.containerList= containerList
      this.containerList = (this.containerList.replace(/\n+$/g,'')).split(/\n/);
    })
  },
  methods : {
    containerSelect(containerName){
        console.log(containerName)
      this.selectContainer = containerName
      axios.get("http://localhost:7000/containerLogs/" + containerName)
      .then(res => {
        const logs = unescape(res.data.result)
        this.logs = logs
        this.logs = (this.logs.replace(/\n+$/g,'')).split(/\n/);
      })
    }
  },
  computed :{
    filteredLogs: function() {
      let logs = [];
      for(let i in this.logs) {
        var log = this.logs[i];
        if(log.indexOf(this.keyword) !== -1) {
          logs.push(log);
        }
      }
      return logs;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list{
  padding: 0;
}
</style>