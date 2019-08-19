<template>
<div>
  <v-flex xs12 sm12>
    <v-text-field
      label="ログ検索"
      outlined
      v-model="keyword"
    ></v-text-field>
  </v-flex>
  <ul id="example-1">
    <li v-for="containerName in containerList" v-bind:key="containerName">
      <v-btn light v-on:click="containerSelect(containerName,'containerName')">{{ containerName }}</v-btn>
    </li>
  </ul>

    <table>
        <tr v-for="log in filteredLogs" v-bind:key="log" >
            <td v-text="log"></td>
        </tr>
    </table>
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
      logs: null
    }
  },
  created(){
    // axios.get("http://localhost:7000/containerLogs/mysql5.7")
    // .then(res => {
    //   const logs = unescape(res.data.result)
    //   console.log(logs)
    //   this.logs = String.fromCharCode(logs)
    //   /*
    //   const file = new Blob([unescape(res.data.result)],{
    //     type: "text/js;charset=utf-8"
    //   })
    //   const fileCreate = document.createElement('a')
    //   fileCreate.download = 'nuxt.log'
    //   fileCreate.href = URL.createObjectURL(file)
    //   fileCreate.click();
    //   */
    // })
        axios.get("http://localhost:7000/containerList")
    .then(res => {
      const containerList = unescape(res.data.result)

      // this.logs = String.fromCharCode(logs)
      this.containerList= containerList
      this.containerList = (this.containerList.replace(/\n+$/g,'')).split(/\n/);
      // this.containerList = this.containerList.split(/\n/)
      //  console.log(this.containerList)
    })
  },
  methods : {
    containerSelect(containerName){
      this.selectContainer = containerName
      axios.get("http://localhost:7000/containerLogs/" + containerName)
    .then(res => {
      const logs = unescape(res.data.result)
      this.logs = logs
      this.logs = (this.logs.replace(/\n+$/g,'')).split(/\n/);
      console.log(this.logs)
      // this.logs = String.fromCharCode(logs)

    })
    }
  },
  computed :{
        filteredLogs: function() {
    var logs = [];

    for(var i in this.logs) {

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

