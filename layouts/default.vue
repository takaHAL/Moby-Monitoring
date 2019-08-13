<template>
<v-app dark>
  <navigation @miniModeChange="modeChange()" />
  <div class="wrap" :style="[miniFlag ? miniFalse : miniTrue]">
    <toolbar :style="[miniFlag ? miniFalse : miniTrue]" />
    <div class="container">
      <nuxt />
    </div>
  </div>
</v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    toolbar : () => import('~/components/toolbar.vue'),
    navigation : () => import('~/components/molecules/navigation/navigation.vue'),
  }
})

export default class DefaultLayout extends Vue {
  miniFlag: boolean = false
  miniFalse: object = {
    paddingLeft: "80px"
  }
  miniTrue: object = {
    paddingLeft: "220px"
  }

  private modeChange(): void{
    this.miniFlag = !this.miniFlag
  }
}
</script>



