<template>
<div>{{ logs }}</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'logs',
  data (){
    return {
      logs: null
    }
  },
  created(){
    axios.get("http://localhost:7000/containerLogs/nuxt.js")
    .then(res => {
      const logs = unescape(res.data.result)
      console.log(logs)
      this.logs = String.fromCharCode(logs)
      /*
      const file = new Blob([unescape(res.data.result)],{
        type: "text/js;charset=utf-8"
      })
      const fileCreate = document.createElement('a')
      fileCreate.download = 'nuxt.log'
      fileCreate.href = URL.createObjectURL(file)
      fileCreate.click();
      */
    })
  }
}
</script>

