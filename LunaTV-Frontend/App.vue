<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
    uni.showToast({
      title: '应用启动成功',
      icon: 'success',
      duration: 2000
    })
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
page {
  background-color: #0d0d0d;
}
</style>
