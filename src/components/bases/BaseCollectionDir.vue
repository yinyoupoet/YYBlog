<template>
    <div>
      <div v-for="(item,index) in collectionList" :key="item.collectionId" class="collection-item">
        <div class="item-title-div">
          <router-link :to="'/collectionDir/' + item.collectionId" class="item-title-link">{{item.collectionName}}</router-link>
          <span class="item-delete-span" v-if="isSelf">删除</span>
        </div>
        <div class="item-menu-div">
          <span class="item-menu-span">创建于 {{item.createTime}}</span>
          <span class="item-menu-span">包含{{item.blogNum}}篇博客</span>
          <span class="item-menu-span">已有{{item.followerNum}}人关注</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "BaseCollectionDir",
      props: ['isSelf'],
      data: function() {
        return {
          collectionList: [{
            collectionId: 1,
            collectionName: '鬼马与天心',
            createTime: '2019-05-09 15:16:03',
            blogNum: 12,
            followerNum: 13
          },{
            collectionId: 2,
            collectionName: '鬼马与天心',
            createTime: '2019-05-09 15:16:03',
            blogNum: 12,
            followerNum: 13
          }],
        }
      }
    }
</script>

<style scoped>
  .collection-item{
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 8px 20px;
    border-radius: 10px;
  }

  .item-title-div {
    font-size: 1.5em;
  }

  .item-title-link{
    text-decoration: none;
    color: #000;
    transition: all 0.3s ease-in-out;
  }
  .item-title-link:hover{
    color: #fff;
    text-shadow: #000 0px 1px 1px, #000 -1px 0px 2px, #000 0 0 5px;
  }

  .item-menu-div {
    margin-top: 15px;
    color: #999;
    font-weight: 600;
  }

  .item-delete-span {
    float: right;
    margin-right: 20px;
    font-size: 15px;
    cursor: pointer;
    font-weight: 600;
    color: #999;
    transition: all 0.5s ease-in-out;
  }
  .item-delete-span:hover {
    color: #f1562a;
  }
  .item-menu-span{
    margin-right: 10px;
  }

</style>
