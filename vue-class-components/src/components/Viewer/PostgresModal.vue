<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-center h-screen bg-gray-900 w-100vw bg-opacity-40 z-5000"
  >
    <div
      v-on-clickaway="hideModal"
      class="flex w-1/3 bg-white rounded-md shadow-md h-80"
    >
      <div class="grid w-full grid-cols-2 gap-12 m-4">
        <Input
          :value="host"
          @on-input="host = $event"
          inputType="text"
          label="Host"
        />
        <Input
          :value="port"
          @on-input="port = $event"
          inputType="text"
          label="Port"
        />
        <Input
          :value="user"
          @on-input="user = $event"
          inputType="text"
          label="User"
        />
        <Input
          :value="password"
          @on-input="password = $event"
          inputType="text"
          label="Password"
        />
        <Input
          :value="dataBase"
          @on-input="dataBase = $event"
          inputType="text"
          label="Database"
        />
        <button
          class="self-end w-full px-3 py-2 text-white bg-indigo-500 rounded-lg justify-self-center hover:shadow-md hover:bg-indigo-600"
        >
          Guardar en Postgres
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { directive as onClickaway } from 'vue-clickaway'
import Input from '../../components/shared/Input.vue'

@Component({
  directives: { onClickaway },
  components: { Input }
})
export default class PostgresModal extends Vue {
  private host: string = ''
  private port: string = ''
  private user: string = ''
  private password: string = ''
  private dataBase: string = ''

  @Emit() hideModal() {}
}
</script>
