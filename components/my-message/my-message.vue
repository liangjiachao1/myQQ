<template>
  <view>
    <view class='my-message-box' @click='gotouserChat'>
      <!-- 头像 -->
      <image class='message-avatar' src='../../static/my1.png'></image>
      <!-- 名字和消息 -->
      <view class="message-name">
        <text class="name">毕业设计111111111111111111111111111111</text>
        <text class="message-jieshuo">123455666666666666666666666666666666666666666666</text>
      </view>
      <!-- 时间和条数-->
      <view class="message-time-num">
        <text class="message-time">晚上6:45</text>
        <text class="message-num">99+</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-message",
    data() {
      return {
        
      };
    },
    methods:{
      gotouserChat(){
        uni.navigateTo({
          url:"/subpkg/user_chat/user_chat"
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
    width:470rpx;
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
    width:100rpx;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 40rpx;
    
    & text:first-child{
      color:gray;
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