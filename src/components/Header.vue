<script setup lang="ts">
import { ref } from 'vue'
const active = ref('全部笔记')
function changeActive(name: string) {
    active.value = name
}
</script>

<template>
    <view class="content">
        <view class="list">
            <view :class="{ 'item': true, 'active-css': active === '全部笔记' }" hover-class="hover-css" hover-start-time="0"
                hover-stay-time="50" @tap="changeActive('全部笔记')">全部笔记
            </view>
        </view>
        <!-- <view class="iconfont icon-jiahao" hover-class="hover-css" hover-start-time="0" hover-stay-time="50"></view> -->
    </view>
</template>


<style lang="scss" scoped>
.content {
    display: flex;
    box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
    background-color: #fff;

    .list {
        flex: 1;
        overflow-y: scroll;
        display: flex;

        .item {
            padding: 20rpx 30rpx;
            white-space: nowrap;
            color: $uni-text-color-grey;

            &.active-css {
                color: $uni-color-primary;
            }
        }
    }

    .icon-jiahao {
        color: $uni-text-color-grey;
        padding: 20rpx;
        display: flex;
        align-items: center;
        font-size: 30rpx;
    }
}
</style>
