<template>
  <div>
    <pre>{{ logs }}</pre>
  </div>
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
    const self = this
    axios.get("http://localhost:7000/containerLogs/nuxt.js")
    .then(res => {
      self.logs = res.data.result
    })
  }
}
</script>

