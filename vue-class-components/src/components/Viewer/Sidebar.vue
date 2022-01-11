<template>
  <div
    class="sidebar-wrapper"
    :class="`${
      isMinimized ? 'w-14 bg-opacity-20 border-gray-700' : 'w-64 bg-white'
    }`"
  >
    <div @click="isMinimized = !isMinimized" class="sidebar-title">
      <img src="../../assets/icons/logo-ifc.png" alt="" class="h-6" />
      <p v-if="!isMinimized" class="ml-2 text-3xl" v-text="'IFC Viewer'" />
    </div>
    <ActionsListItem
      v-for="(action, index) in actionsList"
      :key="index"
      @click.native="handleActive(action, index)"
      :action="action"
      :is-minimized="isMinimized"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator'
import ActionsListItem from '../shared/ActionsListItem.vue'
import { SidebarAction } from '../../store/Models'
import InputRange from '../shared/InputRange.vue'
import normatives from '../../config/normatives'
import IconUpload from '../../assets/icons/file-upload.svg'
import IconPostgres from '../../assets/icons/database-import.svg'

@Component({
  components: { ActionsListItem, InputRange }
})
export default class Sidebar extends Vue {
  @Prop() unactivePostgres!: boolean

  private isMinimized: boolean = false
  private normatives = normatives

  private actionsList: SidebarAction[] = [
    {
      title: 'Upload',
      icon: IconUpload,
      active: false,
      description: 'Select and render ifc files'
    },
    {
      title: 'Postgres',
      icon: IconPostgres,
      active: false,
      description: 'Export Postgress'
    }
  ]

  private change(normativeChanged: { title: string; value: number }) {
    const { title, value } = normativeChanged

    const normative = this.normatives.find(
      normative => normative.title === title
    )
  }

  private isImmediateActions(title: string): boolean {
    return title === 'Upload'
  }

  @Watch('unactivePostgres')
  onUnactivePostgresChange() {
    if (this.unactivePostgres) {
      this.actionsList[1].active = false
    }
  }

  @Emit()
  handleActive(action: SidebarAction, index: number): SidebarAction {
    action.active = !action.active

    if (this.isImmediateActions(action.title)) {
      setTimeout(() => {
        this.actionsList[index].active = false
      }, 150);
    }

    return action
  }
}
</script>
