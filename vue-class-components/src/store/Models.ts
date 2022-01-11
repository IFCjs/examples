import { Vue } from 'vue-property-decorator'

export interface SidebarAction {
  title: string
  icon: Vue.Component
  active: boolean
  description?: string
}

