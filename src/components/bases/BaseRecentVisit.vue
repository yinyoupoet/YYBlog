<template>
    <div>
      <h4>最近访客</h4>
      <div class="recent-container">
        <span v-for="(item,index) in recentVisitUser">
          <a :href="item.userPageUrl" target="_blank"><img :src="item.headImgUrl" class="img-style"></a>
        </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseRecentVisit",
        data: function(){
          return {
            recentVisitUser: [
              {
                id: 1,
                userName: 'kk',
                headImgUrl: "/static/head/3.jpg",
                userPageUrl: "www.baidu.com"
              },
              {
                id:2,
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
              },
              {
                id: 6,
                userName: "gg",
                headImgUrl: "/static/head/11.jpg",
                userPageUrl: "www.baidu.com"
              },
              {
                id: 7,
                userName: "gg",
                headImgUrl: "/static/head/10.jpg",
                userPageUrl: "www.baidu.com"
              }
            ]
          }
        }
    }
</script>

<style scoped>
  h4{
    margin-left: -16px;
  }
  .img-style{
    margin: 3px;
    width: 42px;
    height: 42px;
    border-radius: 6px;
  }

  .recent-container {
    margin-left: -12px;
  }
</style>
