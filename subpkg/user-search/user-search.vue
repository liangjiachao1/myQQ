<template>
  <view>
    <view class="">
      <!-- 搜索区域 -->
      <view class="user-search-bar">
        <uni-search-bar v-model='searchValue' focus="true" @cancel='goBack'>
        </uni-search-bar>
      </view>  
      
      <!-- 搜索结果区域 -->
      <view class="outcome-box">
        <view @click='gotoUserDetail' v-if='true'>
          <my-friend></my-friend>
        </view>  
        
        <view class='no-outcome' v-else>
          没有更多搜索结果
        </view>
      </view>  
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchValue:"",
        rule:''
      };
    },
    onLoad(options){
      this.rule=options.rule
    },
    methods:{
      goBack(){
        uni.switchTab({
          url:`/pages/${this.rule}/${this.rule}`
        })
      },
      gotoUserDetail(){
        uni.navigateTo({
          url:'/subpkg/user-detail/user-detail'
        })
      }
    }
  }
</script>

<style lang="scss">
.user-search-bar{
  width:100%;
  position: fixed;
  top:0;
  left:0;
  background-color: #fff;
}

.outcome-box{
  margin-top:50px;
  
  .no-outcome{
    text-align: center;
    line-height: 30px;
    color:gray;
    
  }
}
</style>