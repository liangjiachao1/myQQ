import Vue from 'vue'
import Vuex from 'vuex'
import ModuleUser from './user.js'
import ModuleNewFriend from './newfriend.js'
import ModuleChat from './chat.js'

Vue.use(Vuex)

const store=new Vuex.Store({
  modules:{
    "m_user":ModuleUser,
    "m_newfriend":ModuleNewFriend,
    "m_chat":ModuleChat
  }
})

export default store