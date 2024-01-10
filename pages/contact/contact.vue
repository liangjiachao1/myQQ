<template>
  <view>
    <!-- 搜索区域 -->
    <my-search rule='contact'></my-search>
    
    <!-- 新朋友通知区域 -->
    <view class="newfriends-item" style='margin-bottom: 0;' @click='gotoUserAdd("newfriend")'>
      <text>新朋友</text>
      <view class="newfriends-icon">
        <text class='newfriends-num' v-if='newfriendnum>0'>{{newfriendnum}}</text>
        <uni-icons type="right" size="24"></uni-icons>
      </view>
    </view>
    <!-- 添加好友分类区域 -->
    <view class="newfriends-item" style='margin-top: 0;' @click="addFriendClass">
      <text>添加分类</text>
      <view class="newfriends-icon">
        <uni-icons type="right" size="24"></uni-icons>
      </view>
    </view>

    
   <!-- 好友分类区域 -->
   <view class="friend-classify">
     <uni-collapse>
     	<uni-collapse-item :show-animation="true" v-for='(item) in friendClass' :key='item.id' :title='`${item.classname} ${item.onlinenum}`'>
     	<!-- <uni-collapse-item :show-animation="true" v-for='(item) in friendClass' :key='item.id' :title='item.classname'> -->
     		<view v-for='(item1) in item.friendsList' :key='item1.id'>
          <my-friend :friend='item1'></my-friend>
        </view>
     	</uni-collapse-item>
     </uni-collapse>
   </view>
   
   <!-- 添加分类弹出层 -->
   <uni-popup ref="inputDialog" type="dialog">
     <uni-popup-dialog ref="inputClose" mode="input" title="添加分类" value="" placeholder="请输入内容"
       @confirm="confirm"></uni-popup-dialog>
   </uni-popup>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        friendClass:[]
      };
    },
    computed:{
      ...mapGetters('m_newfriend',['newfriendnum'])
    },
    async onPullDownRefresh(){
      await this.getFriendClass()
      uni.stopPullDownRefresh()
    },
    onShow() {
      this.getFriendClass()
      this.getNewFriendList()
      uni.onSocketMessage(async (res) =>{
        await this.getFriendClass()
        
      })
    },
    methods:{
      ...mapMutations('m_newfriend',['updataNewFriendsList']),
      // 获取好友分类和好友分类详情
      async getFriendClass(){
        const {data}=await uni.$http.get('/userinfo/friendclass')
        if(data.status!==0) return uni.showMsg(data.message)
        this.friendClass=data.data
        this.friendClass.forEach(item=>{
          item.onlinenum=item.friendsList.filter(item1=>item1.online===1).length
          item.onlinenum=`${item.onlinenum}/${item.friendsList.length}`
        })
        // this.friendClass.forEach(item=>{
        //   item.classname+=item.onlinenum
        // })
      },
      // 获取新朋友数量
      async getNewFriendList(){
        const {data} =await uni.$http.get('/friend/get/friendapplication')
        if(data.status!==0) return uni.showMsg(data.status)
        this.updataNewFriendsList(data.data)
      },
      gotoUserAdd(e){
        uni.navigateTo({
          url:'/subpkg/user-add/user-add?rouler='+e
        })
      },
      // 点击弹出添加分类弹层
      addFriendClass(){
        this.$refs.inputDialog.open()
      },
      // 点击确定按钮
      async confirm(value) {
        // 输入框消失
        // this.$refs.popup.close()
        const {data}=await uni.$http.post('/userinfo/addfriendclass',{classname:value})
        if(data.status!==0) return uni.showMsg(data.message) 
        this.getFriendClass()
      },
    }
  }
</script>

<style lang="scss">
  page{
    background-color: #efefef;
  }
.newfriends-item{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  margin:10px 0;
  font-size: 16px;
  
  .newfriends-icon{
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    
    .newfriends-num{
      color:white;
      background-color: #c00000;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 13px;
      margin-right:5px;
    }
  }
}

.uni-collapse-item__title-text{
  margin-left: -5px;
}
</style>
