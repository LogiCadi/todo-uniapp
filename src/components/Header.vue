<script setup lang="ts">
import { request } from '@/main';
import { ref } from 'vue'
const { search, category, activeCategory, setActiveCategory, getCategory } = defineProps(['search', 'category', 'activeCategory', 'setActiveCategory', 'getCategory'])
const type = ref('list')
const categoryText = ref('')

function changeType(value: string) {
    if (type.value === 'search' && value === 'list') {
        search()
    }
    type.value = value
}
async function createCategory() {
    await request('/createCategory', { name: categoryText.value })
    await getCategory()
    changeType('list')
    setActiveCategory(categoryText.value)
}
async function deleleCategory(name: string) {
    if (name === '全部') {
        uni.showToast({ title: '该项不能被删除', icon: 'error' })
    } else {
        uni.showModal({
            title: '提示',
            content: `是否删除 ${name} 分类？`,
            success: async function (res) {
                if (res.confirm) {
                    await request('/deleteCategory', { name })
                    await getCategory()
                    search()
                }
            }
        });
    }
}
</script>

<template>
    <view class="content">
        <view v-if="type === 'list'" class="list">
            <view v-for="item in category" :class="{ 'item': true, 'active-css': activeCategory === item }"
                hover-class="hover-css" hover-start-time="0" hover-stay-time="50" @tap="setActiveCategory(item)"
                @longtap="deleleCategory(item)">{{
                    item
                }}
            </view>
        </view>
        <view v-if="type === 'search'" class="search">
            <input type="text" auto-focus placeholder="关键字搜索" @input="(e: any) => search(e.detail.value)" />
        </view>
        <view v-if="type === 'createCategory'" class="search">
            <input type="text" auto-focus placeholder="添加分类" @input="(e: any) => categoryText = e.detail.value" />
        </view>

        <view v-if="type === 'list'" class="iconfont icon-add" hover-class="hover-css" hover-start-time="0"
            hover-stay-time="50" @tap="changeType('createCategory')"></view>
        <view v-if="type === 'list'" class="iconfont icon-search1" hover-class="hover-css" hover-start-time="0"
            hover-stay-time="50" @tap="changeType('search')">
        </view>
        <view v-if="type === 'createCategory'" class="iconfont icon-select" hover-class="hover-css" hover-start-time="0"
            hover-stay-time="50" @tap="createCategory">
        </view>
        <view v-if="type === 'search' || type === 'createCategory'" class="iconfont icon-close" hover-class="hover-css"
            hover-start-time="0" hover-stay-time="50" @tap="changeType('list')"></view>
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
            padding: 20rpx;
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
