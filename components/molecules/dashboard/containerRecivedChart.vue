<template>
  <div class="containerChart-card">
    <containerChartHeader :title="title" />
    <containerCpu :chartData="containerData"
     :chartOptions="chartOptions"
     :height="height"
     v-if="loaded" />
  </div>
</template>


<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({
  components: {
    containerChartHeader : () => import('~/components/atoms/dashboard/containerChartHeader.vue'),
    containerCpu : () => import('~/components/atoms/dashboard/containerChart.vue')
  }
})
export default class ContainerRecivedChart extends Vue {
  private title: string = "Container Recived Network Traffic"
  private colorData: string[] = ['#D81B60','#039BE5','#43A047','#FDD835','#FB8C00','#8E24AA']
  private containerData: Chart.ChartData = {datasets: null}
  private loaded: boolean = false
  private height: number = 200
  private containerNetworkRecived: number[] = []
  private chartOptions: Chart.ChartOptions
  private apiFlg:boolean = true

  private created (){
    const self = this
    let containerAry: any[] = []
    let chartDataContainer: object[] = []

    axios.get("http://localhost:7000/containerStats")
    .then(res => {
      containerAry = res.data.containerList
      self.containerNetworkRecived = []
      res.data.containerList.forEach((value,index) => {
        var network = res.data.containerData[index][3]
        self.containerNetworkRecived.push(network.slice(network.indexOf('/'), network.length).replace(/[^0-9^\.]/g, ''))
        chartDataContainer.push({
          type: 'line',
          label: containerAry[index],
          fill: false,
          borderWidth: 1,
          borderColor: self.colorData[index],
          backgroundColor: self.colorData[index],
        })
      })
    }).then(_ => {
      self.containerData.datasets = chartDataContainer
      self.getChartOption()
      self.loaded = true
    })
  }

  private getChartOption(){
    const self = this
    self.chartOptions = {
      responsive: true,
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      legend: {
        labels: {
          fontColor: "#FFF"
        },
      },
      scales: {
        yAxes: [{
          gridLines: {
            color: "#555",
            zeroLineColor: "#555"
          },
          ticks: {
            suggestedMin: 0,
            fontColor: "#FFF"
          }
        }],
        xAxes: [{
          gridLines: {
            color: "#555",
            zeroLineColor: "#555"
          },
          ticks: {
            fontColor: "#FFF",
          },
          type: 'realtime',
          realtime: {
            duration: 6000,
            delay: 5000,
            onRefresh: function(chart) {
              if (self.loaded && self.apiFlg){
                var containerNetworkRecived: number[] = []
                self.apiFlg = false
                axios.get("http://localhost:7000/containerStats")
                .then(res => {
                  containerNetworkRecived = []
                  res.data.containerList.forEach((value,index) => {
                    const network = res.data.containerData[index][3]
                    containerNetworkRecived.push(network.slice(network.indexOf('/'), network.length).replace(/[^0-9^\.]/g, ''))
                  })
                }).then(_ => {
                  self.apiFlg = true
                  self.containerNetworkRecived = containerNetworkRecived
                })
              }
              chart.data.datasets.forEach(function(dataset, index) {
                dataset.data.push({
                  x: Date.now(),
                  y: self.containerNetworkRecived[index]
                })
              })
            },
          }
        }]
      }
    }
  }
}
</script>