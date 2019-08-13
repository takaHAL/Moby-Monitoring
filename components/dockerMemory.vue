<script>
import axios from 'axios'
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

export default {
  data (){
    return {
      /**
      * @type {Array}
      * @type {Array}
       */
      dockerData: [],
      colorCode: ['#039BE5','#D81B60','#43A047','#FDD835','#FB8C00','#8E24AA']
    }
  },
  methods :{
    async dockerDataGetter (){
      /**
       * @type {Array}
       * @type {Int}
       */
      let dockerData = []
      let containerData = []
      let n = 0
      let logData
      let log
      const self = this

      await axios.get("http://localhost:7000/containerMem").then(res => {
        log = res.data.result.split("],")
        log.forEach( function(items,index) {
          logData = items.replace(/"/g,'').replace("[","")
          
          if( logData ){
            containerData = logData.split(",")
            dockerData.push({
              label: containerData[0],
              fill: false,
              borderColor: self.colorCode[index],
              borderWidth: 1,
              backgroundColor: self.colorCode[index],
              lineTension: 0,
            })
          }
        })
      }).then(data =>{
        self.renderChart({
          datasets: dockerData
        },{
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                delay: 6000,
                refresh: 6000,
                duration: 60000,
                onRefresh: function(chart) {
                  axios.get("http://localhost:7000/containerMem").then( res => {
                    let containerStatus = []
                    
                    log = res.data.result.split("],")
                    log.forEach( function(items,index) {
                      logData = items.replace(/"/g,'').replace("[","")
                      if( logData ){
                        containerStatus.push(logData.split(","))
                      }
                    })
                    
                    chart.data.datasets.forEach(function(dataset,index) {   
                      dataset.data.push({
                        x: Date.now(),
                        y: containerStatus[index][1].replace( /%/g,"")
                      })
                    })
                  })
                }
              },
            }]
          }
        })
      })
    },
  },
  created (){
    this.dockerDataGetter()
  },
  extends: Line,
}

</script>