<template>
  <div v-on-clickaway="hideContextMenu" class="card-context-wrapper">
    <p
      v-for="action of actions"
      :key="action"
      @click="clickContextMenu(action)"
      v-text="action"
      class="card-context"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { directive as onClickaway } from 'vue-clickaway'

@Component({
  directives: { onClickaway }
})
export default class ContextMenu extends Vue {
  @Prop() actions!: string[]

  @Emit()
  clickContextMenu(action: string): string {
    return action
  }

  @Emit() hideContextMenu() {}
}
</script>
