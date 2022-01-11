<template>
  <div
    class="list-item-wrapper"
    :title="action.description"
    :class="{
      'list-item-active': action.active,
      'rounded-xl': isMinimized
    }"
  >
    <Component class="list-item-icon" :is="action.icon" />
    <p v-if="!isMinimized" v-text="action.title" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SidebarAction } from '../../store/Models'

@Component
export default class ActionsListItem extends Vue {
  @Prop() action!: SidebarAction
  @Prop({ default: false }) isMinimized!: boolean
}
</script>
