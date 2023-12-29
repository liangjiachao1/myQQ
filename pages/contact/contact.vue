<template>
  <view>
    <!-- 搜索区域 -->
    <my-search></my-search>
    
    <!-- 新朋友通知区域 -->
    <view class="newfriends-item">
      <text>新朋友</text>
      <view class="newfriends-icon">
        <text class='newfriends-num'>99+</text>
        <uni-icons type="right" size="24"></uni-icons>
      </view>
    </view>
    
   <!-- 好友分类区域 -->
   <view class="friend-classify">
     <uni-collapse>
     	<uni-collapse-item :show-animation="true" title="毕业设计(10/20)">
     		<my-friend></my-friend>
     	</uni-collapse-item>
     </uni-collapse>
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
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
