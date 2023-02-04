<script setup lang="ts">
import { ref } from 'vue'
const { search } = defineProps(['search'])
const active = ref('全部笔记')
const type = ref('list')
function changeActive(name: string) {
    active.value = name
}
function changeType() {
    type.value = type.value === 'list' ? 'search' : 'list'
}
</script>

<template>
    <view class="content">
        <view v-if="type === 'list'" class="list">
            <view :class="{ 'item': true, 'active-css': active === '全部笔记' }" hover-class="hover-css"
                hover-start-time="0" hover-stay-time="50" @tap="changeActive('全部笔记')">全部笔记
            </view>
        </view>
        <view v-if="type === 'search'" class="search">
            <input type="text" auto-focus placeholder="请输入笔记关键字" @input="(e: any) => search(e.detail.value)" />
        </view>

        <view v-if="type === 'list'" class="iconfont icon-search" hover-class="hover-css" hover-start-time="0"
            hover-stay-time="50" @tap="changeType">
        </view>
        <view v-if="type === 'search'" class="iconfont icon-close" hover-class="hover-css" hover-start-time="0"
            hover-stay-time="50" @tap="changeType"></view>
        <!-- <view class="iconfont icon-increase" hover-class="hover-css" hover-start-time="0" hover-stay-time="50"></view> -->
    </view>
</template>


<style lang="scss" scoped>
.content {
    display: flex;
    box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
    background-color: #fff;
    height: 80rpx;

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

    .search {
        flex: 1;
        padding: 20rpx;
    }

    .iconfont {
        padding: 20rpx;
        display: flex;
        align-items: center;
        font-size: 32rpx;
    }
}
</style>
