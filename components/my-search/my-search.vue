<template>
  <view class='search-box'>
    <view class="search-item">
      <uni-icons type="search" size="16"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.search-box{
  padding:10px;
  background-color: #fff;
  
  .search-item{
    width:100%;
    height:40px;
    background-color: #efefef;
    color:gray;
    font-size: 16px;
    line-height: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>