export default{
  namespaced:true,
  
  state:()=>({
    newfriendsList:[]
  }),
  
  mutations:{
    updataNewFriendsList(state,friendsList){
      state.newfriendsList=friendsList||state.newfriendsList
    },
  },
  getters:{
    newfriendnum(state){
      const x=state.newfriendsList.length
      const x1='99+'
      const x2=''+x
      return x>99 ? x1 : x2
    }
  }
}