import Vue from 'vue'
import Vuex from 'vuex'
import ModuleUser from './user.js'

Vue.use(Vuex)

const store=new Vuex.Store({
  modules:{
    "m_user":ModuleUser
  }
})

export default store