<template>
  <view class='friend-box'>
    <!-- 头像区域 -->
    <image :src='imgUrl' @click='gotoDetail()'></image>
    
    <!-- 名字和签名区域 -->
    <view class="friend-name" @click='gotoDetail()'>
      <text>{{friend.username ? friend.username:friend.phone}}</text>
      <text><text style='color: lightgreen;' v-if='friend.online===1'>[在线]</text>{{friend.signature? friend.signature:''}}</text>
    </view>
    
   <!-- 是否添加好友 -->
   <view class="add-friend" v-if='isadd'>
      <button type='warn' size='mini' @click='addFriend(0)'>拒绝</button>
      <button type='primary' size="mini" @click='addFriend(1)'>添加</button>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-friend",
    props:{
      friend:{
        type:Object,
      },
      isadd:{
        type:Boolean,
        default:false
      },
      applicationid:{
        type:Number,
        default:0
      }
    },
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_newfriend',['newfriendsList']),
      imgUrl(){
        return this.friend.avatar||'../../static/avatar.png'
      }
    },
    methods:{
      ...mapMutations('m_newfriend',['updataNewFriendsList']),
      async addFriend(application){
        if(this.applicationid===0) return 
        if(application===0){
          const {data}=await uni.$http.post('/friend/handle/friendapplication',{
            application:0,
            id:this.applicationid
          })
          if(data.status!==0) return uni.showMsg(data.messgae)
          // 将拒绝的好友从列表在删除
          const newfriendsList=this.newfriendsList.filter(item=>item.id!==this.applicationid)
          this.updataNewFriendsList(newfriendsList)
        }else if(application===1){
          uni.navigateTo({
            url:'/subpkg/user-add-friend/user-add-friend?friendid='+this.applicationid
          })
        }
      },
      gotoDetail(){
        uni.navigateTo({
          url:'/subpkg/user-detail/user-detail?id='+this.friend.id
        })
      },
    }
  }
</script>

<style lang="scss">
.friend-box{
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 10px;
  position: relative;
  
  image{
    width:80rpx;
    height:80rpx;
    border-radius: 80rpx;
    margin-right: 10px;
  }
  
  .friend-name{
    display: flex;
    flex-direction: column;
    line-height: 40rpx;
    
    & text:first-child{
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 40rpx;
    }
    
    & text:nth-child(2){
      font-size: 13px;
      color:gray;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-height: 40rpx;
    }
  }
  
  .add-friend{
    position: absolute;
    right:20rpx;
    top:20rpx;
  }
}
</style>