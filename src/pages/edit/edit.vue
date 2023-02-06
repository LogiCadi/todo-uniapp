<script setup lang="ts">
import { request } from '@/main';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import { ref } from 'vue'
const id = ref()
const text = ref('')
const create_time = ref('')
const update_time = ref('')
const category = ref('')
/** 是否编辑了文本 */
const textChanged = ref(false)

function edit(e: any) {
    text.value = e.detail.value
    textChanged.value = true
}
async function save() {
    await request('/edit', { id: id.value, text: text.value, category: category.value })
}
async function find() {
    const res = await request('/find', { id: id.value })
    text.value = res.data.text
    create_time.value = res.data.create_time
    update_time.value = res.data.update_time
    category.value = res.data.category
}
onLoad((query) => {
    if (Number(query?.id)) {
        id.value = Number(query?.id)
        find()
    }
    if (query?.category) {
        category.value = query?.category
    }
})
onUnload(() => {
    // 离开页面时保存
    text.value && textChanged.value && save()
})
</script>

<template>
    <view class="content">
        <textarea class="input" auto-focus placeholder="开始写笔记" maxlength="-1" :value="text" @input="edit" />
        <view class="date">
            <view v-if="update_time">编辑于 {{ update_time }}</view>
            <view v-if="create_time">创建于 {{ create_time }}</view>
        </view>
        <view v-if="category" class="tag">{{ category }}</view>
    </view>
</template>

<style lang="scss" scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;

    .input {
        flex: 1;
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

    .date {
        padding: 20rpx;
        font-size: 28rpx;
        color: $uni-text-color-grey;
    }

    .tag {
        font-size: 28rpx;
        color: $uni-color-primary;
        position: absolute;
        right: 30rpx;
        bottom: 30rpx;
        padding: 5rpx 10rpx;
        border: 1px solid $uni-color-primary;
        border-radius: 4rpx;
    }
}
</style>
