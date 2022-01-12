import { __decorate } from 'tslib'
import store from '../../store'
import { getModule, Module, VuexModule } from 'vuex-module-decorators'
let StoreUser = class StoreUser extends VuexModule {
  _user = {
    email: 'test@mail.com'
  }
  get user() {
    return this._user
  }
}
StoreUser = __decorate(
  [
    Module({
      name: 'StoreUser',
      namespaced: true,
      store,
      dynamic: true
    })
  ],
  StoreUser
)
export default getModule(StoreUser)
//# sourceMappingURL=StoreUser.js.map
