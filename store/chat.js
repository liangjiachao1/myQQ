export default {
  namespaced:true,
  
  status:()=>({
    chatMessage:'',
    noRead:0
  }),
  
  mutations:{
    updateChatMessage(state,value){
      state.chatMessage=value
    }
  },
  
  getters:{}
}