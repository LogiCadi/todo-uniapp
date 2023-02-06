<script setup lang="ts">
import Header from '@/components/Header.vue';
import { request } from '@/main';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
const category = ref([])
const activeCategory = ref('')
const list = ref<{ id: number, text: string, create_time: string, update_time: string }[]>([])
function toEdit(id?: number) {
  uni.navigateTo({
    url: `/pages/edit/edit?id=${id}&category=${activeCategory.value}`
  });
}
async function getList(keywords = '') {
  const res = await request('/list', { category: activeCategory.value, keywords })
  list.value = res.data
}
async function getCategory() {
  const res = await request('/getCategory')
  category.value = res.data
  activeCategory.value = res.data[0]
}

onShow(async () => {
  if (!category.value.length) {
    await getCategory()
  }
  getList()
})

function deletePost(id: number) {
  uni.showModal({
    title: '提示',
    content: '是否删除？',
    success: async function (res) {
      if (res.confirm) {
        await request('/delete', { id })
        getList()
      }
    }
  });
}
</script>

<template>
  <view class="content">
    <Header :search="(keywords: string) => getList(keywords)" :category="category" :active-category="activeCategory"
      :set-active-category="(value: string) => { activeCategory = value; getList() }" :get-category="getCategory"/>
    <view class="create-post">
      <view class="iconfont icon-jiahao" hover-class="hover-css-2" hover-start-time="0" hover-stay-time="50"
        @tap="toEdit()">写笔记</view>
    </view>
    <view class="main-list">
      <view v-for="item in list" class="post" hover-class="hover-css" hover-start-time="0" hover-stay-time="50"
        @tap="toEdit(item.id)" @longtap="deletePost(item.id)">
        <view class="title">{{ item.text }}</view>
        <text class="text">{{ item.text }}</text>
        <view class="date">
          <view v-if="item.update_time">编辑于 {{ item.update_time }}</view>
          <view v-if="item.create_time">创建于 {{ item.create_time }}</view>
        </view>
      </view>
    </view>
    <view class="no-data" v-if="!list.length">没有数据</view>
  </view>
</template>

<style lang="scss" scoped>
.content {

  .create-post {
    position: fixed;
    bottom: 0px;
    width: 100%;

    .iconfont {
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

  .main-list {
    padding-bottom: 180rpx;

    .post {
      background-color: #fff;
      margin: 20rpx 0;
      padding: 20rpx 30rpx;
      box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);

      .title {
        font-size: 34rpx;
        font-weight: 700;
        margin-bottom: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .text {
        line-height: 1.6;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 10;
      }

      .date {
        font-size: 28rpx;
        color: $uni-text-color-grey;
        margin-top: 10rpx;
      }
    }
  }

  .no-data {
    text-align: center;
    color: $uni-text-color-grey;
    font-size: 28rpx;
  }
}
</style>
