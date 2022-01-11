<template>
  <div class="flex flex-col">
    <label :for="inputId" class="font-bold text-sm text-white" v-text="text" />
    <input :id="inputId" :value="value" @input="input" class="input-default" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop({ default: '' }) text!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) inputId!: string
}
</script>
