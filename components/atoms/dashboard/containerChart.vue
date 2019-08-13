<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import Chart from 'chart.js'
import { Line, mixins } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

@Component({})
export default class ContainerChart extends Mixins(Line) {
  @Prop() private chartData: Chart.ChartData
  @Prop() public chartOptions: Chart.ChartOptions

  private mounted() {
    this.renderChart(this.chartData,this.chartOptions)
  }
}
</script>