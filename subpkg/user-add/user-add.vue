<template>
  <view>
  <view v-for='(item) in newfriendsList' :key='item.id' >
      <my-friend :isadd='true' :friend='item.userSender' :applicationid='item.id'></my-friend>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_newfriend',['newfriendsList'])
    },
    methods:{

    }
  }
</script>

<style lang="scss">

</style>
