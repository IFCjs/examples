<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-center h-screen bg-gray-900 w-100vw bg-opacity-40 z-5000"
  >
    <div
      v-on-clickaway="hideModal"
      class="w-2/3 bg-white rounded-md shadow-md h-80"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { directive as onClickaway } from 'vue-clickaway'

@Component({
  directives: { onClickaway }
})
export default class PostgresModal extends Vue {
  @Emit()
  hideModal() {}
}
</script>
