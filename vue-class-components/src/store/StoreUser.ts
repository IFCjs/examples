import store from '../store/index'
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'StoreUser',
  namespaced: true,
  store,
  dynamic: true
})
class StoreUser extends VuexModule {
  private _showModalProgram: boolean = false

  @Mutation
  setShowModalProgram(showModalProgram: boolean) {
    console.log('showModalProgram', showModalProgram)

    this._showModalProgram = showModalProgram
  }

  get showModalProgram(): boolean {
    return this._showModalProgram
  }
}

export default getModule(StoreUser)
