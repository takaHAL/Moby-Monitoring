<template>
<div>
  <v-data-table
   :headers="headers"
   :items="containerDataTable"
   :color="mainColor" >
    <template v-slot:items="props">
      <td class="dataTable"><p>{{ props.item.names }}</p></td>
      <td class="dataTable"><p>{{ props.item.status }}</p></td>
      <td class="dataTable"><p>{{ props.item.ports }}</p></td>
      <td class="dataTable"><p>{{ props.item.running }}</p></td>
      <td class="dataTable">
        <v-btn @click="detailsDialog(props.item.id, props.item.status)" icon>
          <v-icon>error</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>

  <v-dialog v-if="id !== ''"
   v-model="dialog"
   width="400" >
    <v-card>
      <detailsDialog  @reloadTable="reloadTable" :id="id" :status="status" />
    </v-card>
  </v-dialog>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    detailsDialog: () => import('~/components/atoms/setting/detailsDialog.vue'),
  }
})
export default class DataTable extends Vue {
  private search: string = ''
  private headers: object[] = [
    { text: 'Container Name', align: 'left', value: 'names', sortable: false },
    { text: 'Status', value: 'networks', sortable: false },
    { text: 'Port', value: 'ports', sortable: false },
    { text: 'Running', value: 'running', sortable: false },
    { text: 'Actions', sortable: false }
  ]
  private containerDataTable: object[] = []
  private mainColor: string = "#FFF"
  private dialog: boolean = false
  private id: string = ''
  private status: boolean = false

  private mounted(){
    this.reloadTable()
  }

  reloadTable(){
    const self = this
    this.dialog = false
    axios.get("http://localhost:7000/dataTableAll")
    .then(res => {
      self.containerDataTable = res.data.psAll
    })
  }

  detailsDialog(id: string,status: string): void{
    this.id = id
    if ( status.indexOf('Exited') != -1) {
      this.status = true
    }else{
      this.status = false
    }
    this.dialog = !this.dialog
  }
}
</script>
