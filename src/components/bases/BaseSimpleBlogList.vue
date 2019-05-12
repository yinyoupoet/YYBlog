<template>
    <div>
      <div class="simple-blog-list-main-div">
        <div v-for="(item, index) in simpleBlogList" class="simple-blog-item">
          <div>
            <span v-if="item.isTop" class="simple-blog-item-top-span">置顶</span>
            <router-link :to="'/blog/' + item.blogId" class="simple-blog-title-link">
              {{item.blogTitle}}
            </router-link>
          </div>
          <div class="simple-blog-item-menu-div">
            <span v-if="item.isOriginal">原创</span>
            <a :href="item.originalUrl" v-if="!item.isOriginal" class="common-link non-original-a" title="查看原文">转载</a>

            <span class="simple-blog-publish-time-span">{{item.publishDate}}</span>
            <span class="simple-blog-view-times-span"><i class="fa fa-eye" aria-hidden="true"/> {{item.readTimes}} 浏览</span>
            <span class="simple-blog-comment-times-span"><i class="fa fa-commenting" aria-hidden="true"/> {{item.commentNum}} 条评论</span>
            <span class="simple-blog-category-span"><i class="fa fa-check-circle" aria-hidden="true"/> <router-link :to="item.categoryUrl" class="common-link">{{item.category}}</router-link></span>


            <span class="simple-blog-operate-span">
              <router-link to="/editor" class="common-link simple-blog-operate-item">编辑</router-link>
              <span class="common-link simple-blog-operate-item">
                <span v-if="item.isTop">取消置顶</span>
                <span v-else>置顶</span>
              </span>
              <router-link to="/editor" class="common-link simple-blog-operate-item">删除</router-link>
            </span>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseSimpleBlogList",
        data: function() {
          return {
            simpleBlogList: [{
              blogId: 1,
              isTop: true,
              blogTitle: '关于数据库批量查询性能优化',
              publishDate: '2019-04-05 12:25:26',
              readTimes: 123,
              category: '日常',
              categoryUrl: '#',
              commentNum: 15,
              isOriginal: true,
              originalUrl: '/blog/1'
            },{
              blogId: 2,
              isTop: false,
              blogTitle: '关于数据库批量插入性能优化',
              publishDate: '2019-04-05 12:36:26',
              readTimes: 1235,
              category: '日常',
              categoryUrl: '#',
              commentNum: 151,
              isOriginal: false,
              originalUrl: '/blog/2'
            }]
          }
        }
    }
</script>

<style scoped>
  .simple-blog-item{
    border: 1px solid #ddd;
    padding: 8px 20px;
    border-radius: 10px;
    margin: 8px 0;
  }

  .simple-blog-title-link{
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    color: #333;
    font-size: 1.25em;
  }

  .simple-blog-title-link:hover{
    color: #fe6646;
  }

  .simple-blog-item-top-span{
    padding: 3px 8px;
    border: 1px solid #ccc;
    color: #999;
    margin: 0 5px 0 0;
    border-radius: 2px;
  }

  .simple-blog-item-menu-div{
    margin-top: 15px;
    padding: 0 12px;
  }

  .non-original-a{
    font-size: 1em;
  }

  .simple-blog-publish-time-span{
    margin-left: 20px;
    color: #666;
  }

  .simple-blog-view-times-span{
    margin-left: 20px;
    color: #666;
  }
  .simple-blog-comment-times-span{
    margin-left: 20px;
    color: #666;
  }

  .simple-blog-category-span{
    margin-left: 20px;
    color: #666;
    font-size: 1em;
  }

  .simple-blog-operate-span{
    float: right;
    padding-right: 20px;
  }

  .simple-blog-operate-item{
    padding: 0 6px;
  }
</style>
