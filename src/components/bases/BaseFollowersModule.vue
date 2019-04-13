<template>
  <div>
    <div class="follower-container">
      <h4 class="head-style">TA的粉丝</h4>
      <div class="head-style show-all common-link">>>显示全部</div>
      <div class="row">
          <span v-for="(item,index) in showFollowers" :key=item.id>
            <a :href="item.userPageUrl" v-if="index<=3">
              <img  :src="item.headImgUrl" :title="item.userName" href="www.baidu.com" class="col-xs-3 img-style">
            </a>
          </span>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BaseFollowersModule",
      data: function () {
        return {
          showFollowers: [
            {
              id: 1,
              userName: "kk",
              headImgUrl: "/static/head/3.jpg",
              userPageUrl: "www.baidu.com"
            },
            {
              id: 2,
              userName: "cc",
              headImgUrl: "/static/head/1.jpg",
              userPageUrl: "www.baidu.com"
            },
            {
              id: 3,
              userName: "gg",
              headImgUrl: "/static/head/4.jpg",
              userPageUrl: "www.baidu.com"
            },
            {
              id: 4,
              userName: "gg",
              headImgUrl: "/static/head/6.jpg",
              userPageUrl: "www.baidu.com"
            },
            {
              id: 5,
              userName: "gg",
              headImgUrl: "/static/head/8.jpg",
              userPageUrl: "www.baidu.com"
            }
          ]
        }
      }
    }
</script>

<style scoped>
  .follower-container{
    padding: 3px 5px;
    width: 100%;
  }

  .head-style {
    display: inline-block;
  }

  .show-all{
    font-size: 14px;
    float: right;
    margin-top: 12px;
  }

  .img-style{
    cursor: pointer;
    padding: 4px;
    border-radius: 16px;
  }
  h4{
    margin-left: -16px;
  }
</style>
