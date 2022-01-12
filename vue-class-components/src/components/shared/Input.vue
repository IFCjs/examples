<template>
  <div>
    <label for="input" class="input-label" v-text="label" />
    <div class="mt-1">
      <input
        id="input"
        :value="value"
        @input="onInput($event.target.value)"
        :type="inputType"
        :autocomplete="autoComplete"
        class="input-field"
        required
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Input extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: 'text' }) inputType!: string
  @Prop({ default: '' }) autoComplete!: string
  @Prop({ default: '' }) label!: string

  @Emit()
  private onInput(value: string): string {
    return value
  }
}
</script>