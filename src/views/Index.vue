<template>
  <div class="index">
    <!--头部图片-->
    <div class="head-img-div" v-bind:style="{backgroundImage: 'url(' + indexImgUrl + ')'}" >
    </div>

    <!--首页导航-->
    <div class="index-head-nav">
      <div class="container">
        <div class="row">
          <!--头像-->
          <div class="index-nav-avatar-div col-xs-3">
            <div class="index-nav-avatar common-img-scale"
                 v-bind:style="{backgroundImage: 'url(' + avatarUrl + ')'}"></div>
          </div>
          <!--三个目录-->
          <div class="index-nav-category-div col-xs-6">
            <div v-for="category in indexNavCategories" :key="category.index" class="index-nav-categories "
                 v-bind:class="{'common-text-selected': category.isSelected}"
                 v-on:mouseover="indexNavHover($event)"
                 v-on:mouseleave="indexNavLeave($event,category)">
              {{category.name}}
            </div>

          </div>
          <!--面包屑导航-->
          <div class="index-breadcrumb-nav" v-show="showBreadCrumb">
            <span class="common-route-link">
              <span class="glyphicon glyphicon-home breadcrumb-icon"></span>首页
            </span>&nbsp;>>&nbsp;<span class="breadcrumb-content">{{breadCrumbContent}}</span>
          </div>
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
        avatarUrl: "/static/head/17.jpg",
        indexNavCategories: [{
          index: 1,
          name: "首页",
          href: "#",
          isSelected: true
        }, {
          index: 2,
          name: "归档",
          href: "#",
          isSelected: false
        }, {
          index: 3,
          name: "留言",
          href: "#",
          isSelected: false
        }, {
          index: 4,
          name: "分享",
          href: "#",
          isSelected: false
        }, {
          index: 5,
          name: "关于",
          href: "#",
          isSelected: false
        },],
        showBreadCrumb: true,
        breadCrumbContent: '归档',
      }
    },
    methods: {
      indexNavHover: function ($event) {
        // 这里可以这么用是因为只要hover都要加上两个class
        $event.currentTarget.className = "index-nav-categories common-text-selected"
      },
      indexNavLeave: function ($event, category) {
        // 这里不能像上面用是因为本来就有两个class的不能给他删掉了
        if (category.isSelected == false) {
          $event.currentTarget.className = "index-nav-categories"
        }
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
    /*height: 360px;*/
    height: 424px;
    position: relative;
    border: none;
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
    /*background-color: #fff;*/
    background: rgba(255, 255, 255, 1);
    top: -64px;
    z-index: 2;
  }

  .index-nav-avatar-div {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 5px;
    background: #fff;
    border-radius: 15px;
    position: relative;
    top: -100px;
    opacity: 1;
    z-index: 3;
    overflow: hidden;
  }

  .index-nav-avatar {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .index-nav-avatar:hover {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.8);
  }


  .index-nav-category-div {
    padding: 20px 15px;
    margin-left: 30px;
  }

  .index-nav-categories {
    display: inline-block;
    font-size: 18px;
    margin-right: 25px;
    cursor: pointer;
    font-weight: 500;
    padding-bottom: 13px;
    transition: all 0.5s;
  }

  /*面包屑导航*/
  .index-breadcrumb-nav {
    height: 64px;
    font-size: 16px;
    font-weight: 500;
    padding: 20px 15px;
    color: #999;
    padding-right: 0;
    margin-right: 0;
  }

  .breadcrumb-icon {
    margin-right: 4px;
  }

  .breadcrumb-content {
    color: #5f5f5f;
  }

  @media screen and (max-width: 899px){
    .index-head-nav{
      display: none;
    }
    .head-img-div{
      display: none;
    }
  }
  @media screen and (min-width: 900px){
    .index-head-nav{
      display: block;
    }
    .head-img-div{
      display: block;
    }
  }
</style>
