<template>
  <view>
     <view class='timeout'><text v-if='chatmessage.timeout'>{{chattime}}</text></view>
     <view class="you-chat-message-box" v-if='!chatmessage.isMy'>
       <image :src='avatar' @click="gotofrienddetail"></image>
       <text>{{chatmessage.message}}</text>
     </view>
    <view class='you-chat-message-box row' v-else>
       <image :src='userinfo.user_avatar' style='margin-left:10px' @click="gotofrienddetail"></image>
       <text style='background-color: deepskyblue;color:#fff'>{{chatmessage.message}}</text>
     </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"you-chat-message",
   
    props:{
      chatmessage:Object,
      avatar:{
        type:String,
        default:'../../static/avatar.png'
      }
    },
    computed:{
      ...mapState('m_user',['userinfo']),
      chattime(){
        const nowtime=new Date().getTime()
        const messagetime=new Date(this.chatmessage.time).getTime()
        if(nowtime-messagetime>1000*60*60*24) {
          return this.chatmessage.time.split('T')[0]+' '+this.chatmessage.time.split('T')[1].split('.')[0].slice(0,5)
        }else{
          return this.chatmessage.time.split('T')[1].split('.')[0].slice(0,5)
        }
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      gotofrienddetail(){
        uni.navigateTo({
          url:'/subpkg/user-detail/user-detail?id='+this.chatmessage.sender
        })
      }
    }
  }
</script>

<style lang="scss">
  .timeout{
    text-align: center;
    font-size: 13px;
    color:gray;
    line-height: 20px;
  }
  
  .you-chat-message-box{
    display:flex;
    margin:10px 10px;
    
    image{
      width:30px;
      height:30px;
      border-radius: 40px;
      margin-right: 10px;
    }
    
    text{
      display: inline-block;
      line-height: 25px;
      font-size: 15px;
      background-color: #fff;
      border-radius: 5px;
      padding:10px 10px;
      max-width: 480rpx;
    }
  }
  
  .row{
    display: flex;
    flex-direction: row-reverse;
  }
  
  // .my-chat-message-box{
  //   display:flex;
  //   margin:10px 10px;
  //   position: absolute;
  //   right:0;
  //   buttom:0;
    
  //   image{
  //     width:30px;
  //     height:30px;
  //     border-radius: 40px;
  //     margin-left: 10px;
  //   }
    
  //   text{
  //     line-height: 25px;
  //     font-size: 15px;
  //     color:#fff;
  //     background-color: deepskyblue;
  //     border-radius: 5px;
  //     padding:10px 10px;
  //     max-width: 450rpx;
  //     margin-left:65px;
  //   }
  // }
</style>