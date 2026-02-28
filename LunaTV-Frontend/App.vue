<script>
  import { useUserStore } from './src/stores/user'

  export default {
    onLaunch: function () {
      console.log('App Launch')
      
      const userStore = useUserStore()
      
      if (!userStore.isLoggedIn) {
        uni.redirectTo({ url: '/pages/login/login' })
      }
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  @import '@/static/styles/global.scss';

  page {
    background-color: #0d0d0d;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
</style>
