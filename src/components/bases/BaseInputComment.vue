<template>
  <!-- 评论输入框 -->
  <div>
    <div class="comment-input-div">
      <h4 class="comment-title">说点什么 _(ˇωˇ」∠)_ </h4>
      <textarea class="comment-input"></textarea>
      <div class="comment-send-div">
        <button class="comment-send-btn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BaseInputComment",
        data: function () {
          return {
            isLogin: true
          }
        }
    }
</script>

<style scoped>

  .comment-input-div{
    font-family: 'Comic Sans MS', 'Mirages Custom', 'Merriweather', 'Open Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
  }

  .comment-title{
    font-weight: 400;
    margin: 0 2rem 2rem;
    font-family:  'Josefin Sans Light', -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "'Hiragino Sans GB", STHeiti, "Microsoft Yahei", "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei", Arial, Verdana, sans-serif;;
  }

  .comment-input{
    margin:  0 2rem 0;
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

  .comment-send-div{
    text-align: center;
    margin-top: 10px;
  }

  .comment-send-btn{
    padding: 10px 25px;
    outline: none;
    background: #fff;
    color: #ffab40;
    text-shadow: 0px 0px 1px rgba(0,0,0,0.3);
    font-weight: 400;
    border: 2px solid #ffab40;
    border-radius: 5px;
    transition: all 0.5s;
  }

  .comment-send-btn:hover{
    background: #f1562a;
    color: #fff;
    border: 2px solid #ccc;
  }

</style>
