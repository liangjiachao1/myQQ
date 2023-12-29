<template>
  <view class='friend-box'>
    <!-- 头像区域 -->
    <image src="../../static/avatar.png"></image>
    
    <!-- 名字和签名区域 -->
    <view class="friend-name">
      <text>我的关心</text>
      <text><text style='color: lightgreen;'>[在线]</text>11111111111111</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-friend",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.friend-box{
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 10px;
  
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
    }
    
    & text:nth-child(2){
      font-size: 13px;
      color:gray;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>