<template>
  <view class='you-chat-message-box' v-if='ismy'>
    <image src='../../static/31.png'></image>
    <text>手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达</text>
  </view>
  <view class='my-chat-message-box' v-else>
    <text>手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手机打开瓦坎达手</text>
    <image src='../../static/31.png'></image>
  </view>
</template>

<script>
  export default {
    name:"you-chat-message",
    props:{
      ismy:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .you-chat-message-box{
    display:flex;
    margin:10px 10px;
    
    image{
      width:40px;
      height:40px;
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
  
  .my-chat-message-box{
    display:flex;
    margin:10px 10px;
    
    image{
      width:40px;
      height:40px;
      border-radius: 40px;
      margin-left: 10px;
    }
    
    text{
      line-height: 25px;
      font-size: 15px;
      color:#fff;
      background-color: deepskyblue;
      border-radius: 5px;
      padding:10px 10px;
      max-width: 450rpx;
      margin-left:65px;
    }
  }
</style>