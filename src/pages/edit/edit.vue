<script setup lang="ts">
import { request } from '@/main';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue'
const id = ref()
const post = ref('')
function edit(e: any) {
    post.value = e.detail.value
}
async function save() {
    await request('/edit', { id: id.value, text: post.value })
    uni.navigateBack()
}
async function find() {
    const res = await request('/find', { id: id.value })
    post.value = res.data.text
}
onLoad((query) => {
    if (Number(query?.id)) {
        id.value = Number(query?.id)
        find()
    }
})
</script>

<template>
    <view class="content">
        <textarea class="input" auto-focus placeholder="写笔记" maxlength="-1" :value="post" @input="edit" />
        <view class="save" hover-class="hover-css-2" hover-start-time="0" hover-stay-time="50" @click="save">
            保存</view>
    </view>
</template>

<style lang="scss" scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .input {
        flex: 1;
        background-color: #fff;
        width: 100%;
        padding: 20rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        line-height: 1.6;
    }

    .save {
        font-size: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30rpx 30rpx 90rpx;
        background-color: $uni-color-primary;
        padding: 20rpx;
        border-radius: 4px;
        color: #fff;
        box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
    }
}
</style>
