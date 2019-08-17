<template>
<div>
  <v-data-table
   :headers="headers"
   :items="containerDataTable"
   :color="mainColor" >
    <template v-slot:items="props">
      <td class="dataTable"><p>{{ props.item.names }}</p></td>
      <td class="dataTable"><p>{{ props.item.networks }}</p></td>
      <td class="dataTable"><p>{{ props.item.ports }}</p></td>
      <td class="dataTable"><p>{{ props.item.running }}</p></td>
      <td class="dataTable">
        <v-btn @click="detailsDialog(props.item.id)" icon>
          <v-icon>error</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>

  <v-dialog v-if="id !== ''"
   v-model="dialog"
   width="400" >
    <v-card>
      <detailsDialog :id="id" />
    </v-card>
  </v-dialog>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    detailsDialog: () => import('~/components/atoms/network/detailsDialog.vue'),
  }
})
export default class DataTable extends Vue {
  private search: string = ''
  private headers: object[] = [
    { text: 'Container Name', align: 'left', value: 'names', sortable: false },
    { text: 'Networks', value: 'networks', sortable: false },
    { text: 'Port', value: 'ports', sortable: false },
    { text: 'Running', value: 'running', sortable: false },
    { text: 'Details', sortable: false }
  ]
  private containerDataTable: object[] = []
  private mainColor: string = "#FFF"
  private dialog: boolean = false
  private id: string = ''

  private mounted(){
    const self = this
    axios.get("http://localhost:7000/dataTable")
    .then(res => {
      self.containerDataTable = res.data.ls
    })
  }

  detailsDialog(id: string): void{
    this.id = id
    this.dialog = !this.dialog
  }
}
</script>
