<template>
  <div class="index">
    <!--头部图片-->
    <div class="head-img-div" v-bind:style="{backgroundImage: 'url(' + indexImgUrl + ')'}">
    </div>

    <!--首页导航-->
    <div class="index-head-nav">
      <div class="container">
        <!--头像-->
        <div class="index-nav-avatar-div">
          <div class="index-nav-avatar" v-bind:style="{backgroundImage: 'url(' + avatarUrl + ')'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data: function () {
      return {
        indexImgUrl: "/static/index_head_bg_2.jpg",
        avatarUrl: "/static/head/18.jpg"
      }
    }
  }
</script>

<style scoped>
  /*头部图片*/
  .head-img-div {
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 360px;
    position: relative;
  }

  .head-img-div:before {
    /*其余滤镜样式去commonStyle中复制*/
    background: rgba(0, 0, 0, 0.1);
    display: block;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  /*首页导航*/
  .index-head-nav {
    position: relative;
    width: 100%;
    height: 64px;
    background-color: #fff;
  }

  .index-nav-avatar-div {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 5px;
    background: #fff;
    border-radius: 15px;
    position: absolute;
    top: -100px;
    opacity: 1;
    z-index: 2;
  }

  .index-nav-avatar {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>
