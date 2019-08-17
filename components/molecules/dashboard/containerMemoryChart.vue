<template>
  <div class="containerChart-card">
    <containerChartHeader :title="title" />
    <containerCpu :chartData="containerData"
     :chartOptions="chartOptions"
     :height="height"
     v-if="loaded" />
    <div v-else>
      <v-progress-circular
       indeterminate
       color="#8BC34A" />
    </div>
  </div>
</template>


<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from 'chart.js'
declare global {
    interface Window {
        containerMemoryData: number[],
    }
}
@Component({
  components: {
    containerChartHeader : () => import('~/components/atoms/dashboard/containerChartHeader.vue'),
    containerCpu : () => import('~/components/atoms/dashboard/containerChart.vue')
  }
})
export default class ContainerMemoryChart extends Vue {
  private title: string = "Container Memory Usage"
  private colorData: string[] = ['#D81B60','#039BE5','#43A047','#FDD835','#FB8C00','#8E24AA']
  private containerData: Chart.ChartData = {datasets: null}
  private loaded: boolean = false
  private height: number = 200

  private created (){
    const self = this
    let containerAry: any[] = []
    let chartDataContainer: object[] = []

    axios.get("http://localhost:7000/containerStats")
    .then(res => {
      containerAry = res.data.containerList
      window.containerMemoryData = []
      res.data.containerList.forEach((value,index) => {
        window.containerMemoryData.push(res.data.containerData[index][2])
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
      self.loaded = true
    })
  }

  public chartOptions: Chart.ChartOptions = {
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
          delay: 2000,
          onRefresh: function(chart) {
            var containerMemoryData: number[] = []
            axios.get("http://localhost:7000/containerStats")
            .then(res => {
              containerMemoryData = []
              res.data.containerList.forEach((value,index) => {
                containerMemoryData.push(res.data.containerData[index][2])
              })
            }).then(_ => {
              window.containerMemoryData = containerMemoryData
            })
            chart.data.datasets.forEach(function(dataset, index) {
              dataset.data.push({
                x: Date.now(),
                y: window.containerMemoryData[index]
              })
            })
          },
        }
      }]
    }
  }
}
</script>