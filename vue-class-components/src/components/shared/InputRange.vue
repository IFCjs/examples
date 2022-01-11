<template>
  <div class="input-range-wrapper">
    <div
      class="flex justify-between"
      :class="{ 'text-green-500': value !== 0 }"
    >
      <label for="range" v-text="title" class="mb-3" />
      <p v-text="value" />
    </div>
    <input type="range" id="range" :min="min" :max="max" v-model="value" />
    <p class="sidebar-range-legend left-0" v-text="min" />
    <p class="sidebar-range-legend right-0" v-text="max" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class InputRange extends Vue {
  @Prop({ default: '' }) title!: string
  @Prop({ default: 0 }) min!: number
  @Prop({ default: 100 }) max!: number

  private value: number = 0

  @Watch('value')
  onValueChange() {
    this.change()
  }

  @Emit()
  change(): { title: string; value: number } {
    return {
      title: this.title,
      value: this.value
    }
  }
}
</script>
