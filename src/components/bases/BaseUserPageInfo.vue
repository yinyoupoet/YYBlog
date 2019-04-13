<template>
  <div>
    <h3 class="userName">{{userName}}</h3>
    <h5 class="userMotto">{{userMotto}}</h5>

    <hr>


    <div class="row blog-info">
      <div class="col-xs-3">
        <p>文章数</p>
        <p>{{articleNum}}</p>
      </div>
      <div class="col-xs-3">
        <p>访问量</p>
        <p>{{visitNum}}</p>
      </div>
      <div class="col-xs-3">
        <p>喜欢</p>
        <p>{{loveNum}}</p>
      </div>
      <div class="col-xs-3">
        <p>评论</p>
        <p>{{commentNum}}</p>
      </div>
    </div>

    <hr>


    <ul class="user-info-list-ul common-list-ul">
      <li class="common-list-li">{{userLocation}}</li>
      <li class="common-list-li"><a class="common-link" @click="linkto(userGithub)">Github地址</a></li>
      <li class="common-list-li">主人翁在{{lastLogin}}来过。</li>
    </ul>



    <div class="contact" v-if="!isSelf">
        <button class="common-btn" @click="sendEmail" :title="emailAddress">发送邮件</button>
        <button class="common-btn follow-btn" v-if="!isFollowed" title="关注" @click="followSwap">关注</button>
        <button class="common-btn follow-btn" v-if="isFollowed" title="取消关注" @click="followSwap">已关注</button>
    </div>




  </div>
</template>

<script>
    export default {
        name: "BaseUserPageInfo",
        data: function () {
          return {
            userName: '吟游诗人',
            userMotto: '平山海，踏河川，往来皆虚妄，长路任蹉跎',
            userLocation: 'ChangSha, China',
            userGithub: 'http://www.baidu.com',
            lastLogin: '15分钟前',
            articleNum: 15,
            visitNum: 999,
            loveNum: 55,
            commentNum: 15,
            emailAddress: 'zkk981127@qq.com',
            isSelf: false,
            isFollowed: false
          }
        },
      methods: {
        linkto: function (url) {
          // 实现a标签的点击跳转功能，因为要跳转外链，直接用:href不行
          window.open(url)
        },
        followSwap: function () {
          // 用来进行是否关注的转换
          this.isFollowed = !this.isFollowed;
        },
        sendEmail: function () {
          document.location = "Mailto:"+ this.emailAddress +"";
        }
      }
    }
</script>

<style scoped>
  .userName {
    color: #333;
  }

  .userMotto {
    color: #333;
  }

  .user-info-list-ul {
    margin-top: 8px;
  }

  hr{
    border-top: 1px solid #eee;
    width: 100%;
    margin-top: -5px;
    margin-bottom: 8px;
  }

  .blog-info div{
    text-align: center;
  }
  .blog-info p{
    margin: 0 0 5px;
  }

  .contact{
    text-align: left;
  }
  .col-xs-3{
    padding: 0;
  }
</style>
