<template>
  <view>
    <view class='my-message-box' @click='gotouserChat'>
      <!-- 头像 -->
      <image class='message-avatar' :src='imgUrl'></image>
      <!-- 名字和消息 -->
      <view class="message-name">
        <text class="name">{{username}}  </text>
        <text class="message-jieshuo">{{message.message[0].message}}</text>
      </view>
      <!-- 时间和条数-->
      <view class="message-time-num">
        <text class="message-time">{{chattime}}</text>
        <text class="message-num" v-if='message.noRead!==0'>{{message.noRead}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-message",
    props:{
      message:Object
    },
    data() {
      return {
        
      };
    },
    computed:{
      chattime(){
        const nowtime=new Date().getTime()
        const messagetime=new Date(this.message.message[0].time).getTime()
        if(nowtime-messagetime>1000*60*60*24) {
          return this.message.message[0].time.split('T')[0]
        }else{
          return this.message.message[0].time.split('T')[1].split('.')[0].slice(0,5)
        }
      },
      imgUrl(){
        return this.message.avatar||"../../static/avatar.png"
      },
      username(){
        const name=this.message.username || this.message.phone
        return name||'null'
      }
    },
    methods:{
      gotouserChat(){
        uni.navigateTo({
          url:"/subpkg/user_chat/user_chat?id="+this.message.recipients
        })
      }
    }
  }
</script>

<style lang="scss">
.my-message-box{
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding:10px;
  
  .message-avatar{
    width:80rpx;
    height:80rpx;
    border-radius: 80rpx;
  }
  
  .message-name{
    width:420rpx;
    display: flex;
    flex-direction: column;
    line-height: 40rpx;
    
    
    & text:first-child{
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    & text:nth-child(2){
      font-size: 12px;
      color:gray;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .message-time-num{
    position: relative;
    width:150rpx;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 20px;
    
    & text:first-child{
      color:gray;
      white-space: nowrap;
      text-align: right;
    }
    
    & text:nth-child(2){
      position:absolute;
      bottom: 0;
      right: 0;
      color:#fff;
      padding: 0 6px;
      border-radius: 60rpx;
      background-color: #c00000;
    }
  }
}
</style>