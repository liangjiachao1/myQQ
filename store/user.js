export default {
  namespaced:true,
  
  state:()=>({
    token:uni.getStorageSync('token')||'',
    // user_avatarUrl,user_username
    userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}')
  }),
  
  mutations:{
    updateToken(state,token){
      state.token=token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    },
    updateUserInfo(state,userinfo){
      state.userinfo=userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
  },
  
  getters:{}
}