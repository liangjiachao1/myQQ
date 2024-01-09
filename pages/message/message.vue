<template>
  <view>
    <my-search></my-search>
    <view v-for='(item) in chatMessage' :key='item.recipients'>
      <my-message :message='item'></my-message>
    </view>
  </view>
</template>

<script>
  export default {  
    data() {
      return {
          chatMessage:[]
        }
      },
      onShow(){
        this.getChatMessage()
      },
      async onPullDownRefresh(){
        await this.getChatMessage()
        uni.stopPullDownRefresh()
      },
      methods:{
        async getChatMessage(){
          const {data}=await uni.$http.get('/user/chat/message')
          if(data.status!==0) return uni.showMsg(data.message)
          this.chatMessage=data.data
        }
      }
    }

</script>

<style lang="scss">

</style>
