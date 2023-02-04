<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import url('@/static/font/iconfont.css');

.hover-css {
  background-color: #eee !important;
}

.hover-css-2 {
  background-color: #24539b !important;
}

page {
  background-color: #f6f6f6;
  font-size: 30rpx;

  view {
    box-sizing: border-box;
  }
}
</style>
