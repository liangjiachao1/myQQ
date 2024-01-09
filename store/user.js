export default {
  namespaced:true,
  
  state:()=>({
    token:uni.getStorageSync('token')||'',
    // avatar,username,phone,signature,id
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
      if(!userinfo.avatar) {
        uni.base64ToPath(userinfo.avatar)
          .then(path => {
            userinfo.avatar=path
          })
          .catch(error => {
            uni.showMsg(error)
          })
      }
      state.userinfo=userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
  },
  
  getters:{}
}