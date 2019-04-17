<template>
  <!-- 评论分两种，basicComment，childComment，basic为一级，child为二级 -->

    <div>
      <div class="comment-list-div">
        <h4>留言({{commentNum}})</h4>

        <div v-for="(item, index) in commentList" :key = item.commentId
             class="basicComment row"
             v-on:mouseover="rotate1($event)"
             v-on:mouseleave="rotate2($event)">
          <div class="basicComment-left col-xs-1">
            <a :href="'/user/' + item.posterId">
              <img :src="item.posterHeadImg" class="comment-head-img"
                   v-on:mouseover="rotate1($event)"
                   v-on:mouseleave="rotate2($event)">
            </a>
          </div>
          <div class="basicComment-right col-xs-11">
              <div class="basicComment-item">
                <div class="basicComment-info-div">
                  <p class="comment-info-p"><span class="comment-info-span">{{item.posterName}}</span></p>
                  <p class="comment-info-p">
                    <span class="comment-info-span">{{item.postTime}}</span>
                    <button class="comment-reply-btn" @click="basicCommentReply(item)">回复</button>
                  </p>
                </div>
                <p class="comment-content-p">{{item.commentContent}}</p>

                <!--回复框-->
                <div class="reply-input-div" v-if="item.showReplyDiv">
                  <p class="reply-input-title-bar">
                    <span class="reply-title-span">期待您的回复</span>
                    <button class="comment-cancel-reply-btn" @click="basicCommentCancelReply(item)">取消评论</button>
                  </p>
                  <p>@ {{item.posterName}}</p>
                  <textarea class="comment-input"></textarea>
                  <button class="reply-send-btn">发送</button>
                </div>

              </div>

              <!--childComment列表-->
              <div class="childComment-list-div">
                <div class="childComment-item row" v-for="(child, index) in item.childComments" :key="child.commentId">
                  <div class="col-xs-1">
                    <img :src="child.posterHeadImg" class="comment-head-img"
                         v-on:mouseover="rotate1($event)"
                         v-on:mouseleave="rotate2($event)">
                  </div>
                  <div class="col-xs-11 childComment-info-div">
                    <div class="childComment-info-item">
                      <div class="basicComment-info-div">
                        <p class="comment-info-p"><span class="comment-info-span">{{child.posterName}}</span></p>
                        <p class="comment-info-p">
                          <span class="comment-info-span">{{child.postTime}}</span>
                          <button class="comment-reply-btn" @click="childCommentReply(child)">回复</button>
                        </p>
                        <p class="comment-info-p"><span class="comment-info-span">@{{child.replyUserName}}</span></p>
                      </div>
                      <p class="comment-content-p">{{child.commentContent}}</p>

                      <!--回复框-->
                      <div class="reply-input-div" v-if="child.showReplyDiv">
                        <p class="reply-input-title-bar">
                          <span class="reply-title-span">期待您的回复</span>
                          <button class="comment-cancel-reply-btn" @click="childCommentCancelReply(child)">取消评论</button>
                        </p>
                        <p>@ {{child.posterName}}</p>
                        <textarea class="comment-input"></textarea>
                        <button class="reply-send-btn">发送</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "BaseCommentList",
        data: function() {
          return {
            commentNum: 22,
            commentList: [
              {
                /*每一个item都是一个basicComment，一个basicComment里包含了很多个childComemnt*/
                commentId: 1233, /*评论的ID*/
                posterId: '123',  /*发评论的人的ID*/
                posterName: '曾凯凯', /*发评论的人的用户名*/
                posterHeadImg: '/static/head/14.jpg', /*发评论的人的头像的路径*/
                postTime: '2019-03-14 15:02:11',  /*评论发布时间*/
                commentContent: '今天天气真好，好想Sleep.今天天气真好，好想Slee气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep', /*评论内容*/
                showReplyDiv: false,  /*是否显示回复框，默认不显示*/
                childComments: [  /*basicComment里面包含的chilidComment列表*/
                  {
                    commentId: 1234,  /*评论自己的ID*/
                    replyUserName: '吟游诗人', /*这条childComment回复的用户的用户名*/
                    posterId: '12345', /*发评论的人的ID*/
                    posterName: '碧瑶', /*发评论的人的用户名*/
                    posterHeadImg: '/static/head/15.jpg', /*发评论的人的头像*/
                    postTime: '2019-03-15 15:03:01', /*评论发布时间*/
                    commentContent: '哈哈，睡Lo', /*评论内容*/
                    showReplyDiv: false /*是否显示回复框，默认不显示*/
                  },
                  {
                    commentId: 1235,  /*评论自己的ID*/
                    replyUserName: '吟游诗人', /*这条childComment回复的用户的用户名*/
                    posterId: '12345', /*发评论的人的ID*/
                    posterName: '碧瑶', /*发评论的人的用户名*/
                    posterHeadImg: '/static/head/15.jpg', /*发评论的人的头像*/
                    postTime: '2019-03-15 15:03:01', /*评论发布时间*/
                    commentContent: '哈哈，睡Lo', /*评论内容*/
                    showReplyDiv: false /*是否显示回复框，默认不显示*/
                  }
                ]
              },
              {
                /*每一个item都是一个basicComment，一个basicComment里包含了很多个childComemnt*/
                commentId: 123, /*评论的ID*/
                posterId: '123',  /*发评论的人的ID*/
                posterName: '曾凯凯', /*发评论的人的用户名*/
                posterHeadImg: '/static/head/14.jpg', /*发评论的人的头像的路径*/
                postTime: '2019-03-14 15:02:11',  /*评论发布时间*/
                commentContent: '今天天气真好，好想Sleep.今天天气真好，好想Slee气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep今天天气真好，好想Sleep', /*评论内容*/
                showReplyDiv: false,  /*是否显示回复框，默认不显示*/
                childComments: [  /*basicComment里面包含的chilidComment列表*/
                  {
                    commentId: 124,  /*评论自己的ID*/
                    replyUserName: '吟游诗人', /*这条childComment回复的用户的用户名*/
                    posterId: '12345', /*发评论的人的ID*/
                    posterName: '碧瑶', /*发评论的人的用户名*/
                    posterHeadImg: '/static/head/15.jpg', /*发评论的人的头像*/
                    postTime: '2019-03-15 15:03:01', /*评论发布时间*/
                    commentContent: '哈哈，睡Lo', /*评论内容*/
                    showReplyDiv: false /*是否显示回复框，默认不显示*/
                  },
                  {
                    commentId: 125,  /*评论自己的ID*/
                    replyUserName: '吟游诗人', /*这条childComment回复的用户的用户名*/
                    posterId: '12345', /*发评论的人的ID*/
                    posterName: '碧瑶', /*发评论的人的用户名*/
                    posterHeadImg: '/static/head/15.jpg', /*发评论的人的头像*/
                    postTime: '2019-03-15 15:03:01', /*评论发布时间*/
                    commentContent: '哈哈，睡Lo', /*评论内容*/
                    showReplyDiv: false /*是否显示回复框，默认不显示*/
                  }
                ]
              }
            ]
          }
        },
      methods: {
        rotate1: function($event){
          var el = $event.target;
          var imgs = $(el).find('.comment-head-img').css('transform','rotate(360deg)');
        },
        rotate2: function($event){
          var el = $event.target;
          var imgs = $(el).find('.comment-head-img').css('transform','rotate(0deg)');
        },
        basicCommentReply: function(basicComment){
          basicComment.showReplyDiv = true;
        },
        basicCommentCancelReply: function(basicComment){
          basicComment.showReplyDiv = false;
        },
        childCommentReply: function (childComment) {
          childComment.showReplyDiv = true;
        },
        childCommentCancelReply: function (childComment) {
          childComment.showReplyDiv = false;
        }
      }
    }
</script>

<style scoped>
  .comment-list-div{
    padding: 0 20px;
    font-family: 'Comic Sans MS', 'Mirages Custom', 'Merriweather', 'Open Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
  }

  .basicComment{
    margin-top: 20px;
  }

  .comment-head-img{
    width: 48px;
    height: 48px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
    transition: all 0.5s ease-in-out;
  }

  .basicComment-right{
    padding: 0 20px;
  }
  .comment-info-span{
    padding: 4px 2px;
    text-indent: 2em;
    border-radius: 5px;
    cursor: pointer;
  }
  .comment-info-span:hover{
    background: #eee;
  }

  .comment-content-p {
    margin-top: 8px;
  }

  .comment-info-p {
    margin-bottom: 6px;
    font-weight: 100;
    font-size: 0.9em;
  }

  .comment-reply-btn{
    outline: none;
    border: 2px solid #ffab40;
    border-radius: 3px;
    background: #fff;
    color: #ffab40;
    padding: 2px 3px;
    font-weight: 100;
    font-size: 0.9em;
    float: right;
    margin-top: -12px;
    transition: all 0.5s;
  }

  .comment-reply-btn:hover{
    background: #f1562a;
    color: #fff;
    border: 2px solid #f1562a;
  }

  .basicComment-item{
    padding: 5px 10px;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .basicComment-item:hover{
    box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
  }


  .childComment-list-div{
    padding-left: 15px;
    border-left: 2px solid #ccc;
    margin-top: 10px;
  }

  .childComment-info-div {
    padding: 5px 15px 5px 20px;
  }

  .childComment-info-item{
    padding: 5px 10px;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .childComment-info-item:hover{
    box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
  }


  .reply-input-div {
    transition: all 0.5s ease-in-out;
  }

  .reply-title-span {
    font-weight: 200;
    font-size: 1.5em;
    color: #1abc9c;
  }

  .comment-cancel-reply-btn{
    outline: none;
    border: 2px solid #ffab40;
    border-radius: 3px;
    background: #fff;
    color: #ffab40;
    padding: 2px 3px;
    font-weight: 100;
    font-size: 0.9em;
    float: right;
    margin-top: 10px;
    transition: all 0.5s;
  }

  .comment-cancel-reply-btn:hover{
    background: #f1562a;
    color: #fff;
    border: 2px solid #f1562a;
  }

  .comment-input{
    margin:  0;
    width: 100%;
    height: 9em;
    padding: 6px 10px;
    border-radius: 5px;
    outline: none;
    transition: all 0.5s;
    border: 2px solid #ccc;
  }

  .comment-input:focus{
    border: 2px solid #e87b00;
  }

  .reply-send-btn {
    width: 100%;
    padding: 5px;
    background: #fff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    outline: none;
    border: 2px dotted #777;
    color:#777;
    transition: all 0.5s;
  }

  .reply-send-btn:hover{
    border: 2px dotted #e87b00;
    color: #e87b00;
  }
</style>
