<template>
  <view>
    <view class="">
      <!-- 搜索区域 -->
      <view class="user-search-bar">
        <uni-search-bar v-model='searchValue' focus="true" @cancel='goBack'>
        </uni-search-bar>
      </view>  
      
      <!-- 搜索结果区域 -->
      <view class="outcome-box" v-if='searchValue!==""'>
        <view v-if='searchList.length!==0'>
          <view v-for='(item) in searchList' :key='item.id' @click='gotoUserDetail(item.id)' >
            <my-friend :friend='item'></my-friend>
          </view>
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
        rule:'',
        timer:null,
        searchList:[]
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
      gotoUserDetail(id){
        uni.navigateTo({
          url:'/subpkg/user-detail/user-detail?id='+id
        })
      },
      async friendSearch(newValue){
        if(this.timer) clearTimeout(this.timer)
        this.timer=setTimeout(async ()=>{
          const {data}=await uni.$http.get('/friend/search?keywords='+newValue)
          if(data.status!==0) return uni.showMsg(data.message)
          this.searchList=data.data
          this.timer=null
        },1500)
      },
    },
    watch:{
      searchValue(newValue){
        this.friendSearch(newValue)
      }
    },
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