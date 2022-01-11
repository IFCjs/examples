declare module '*.svg' {
  import { VueClass } from 'vue-class-component/lib/declarations'
  import { Vue } from 'vue-property-decorator'

  type Svg = VueClass<Vue>
  const content: Svg
  export default content
}
