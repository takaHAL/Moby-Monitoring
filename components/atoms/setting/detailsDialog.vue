<template>
  <div>
    <v-tabs color="#8BC34A">
      <v-tab>Actions</v-tab>

      <v-tab-item>
        <div>
          <v-btn color="primary" @click="dockerActions('start')">Start</v-btn>
          <v-btn color="success" @click="dockerActions('restart')">Restart</v-btn>
          <v-btn color="error" :disabled=status @click="dockerActions('stop')">Stop</v-btn>
        </div>
      </v-tab-item>
    </v-tabs>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class DetailsDialog extends Vue {
  @Prop() id!: string
  @Prop() status!: boolean
  private tab: any = null
  private configData: object[] = []
  private NetworkData: object[] = []

  private dockerActions(action: String){
    const self = this
    axios.get("http://localhost:7000/containerAction/"+action+"/"+this.id)
    .then(res => {
      console.log(res.data)
      this.$emit('reloadTable');
    })
  }
}
</script>
