<template>
    <div>

      <BaseTopBar/>


      <!--显示信息页面-->
      <div class="account-main-div" v-if="!showModify">
        <div class="head-img-div">
          <img class="head-img" :src="userAvatarUrl">
        </div>
        <div class="change-option-div">
          <span class="change-span">修改资料</span><br/>
          <span class="change-pwd">修改密码</span>
        </div>

        <div class="account-info-div">
          <div class="account-user-name">
            {{userName}}
          </div>
          <div class="account-user-motto">
            {{userMotto}}
          </div>


          <div class="account-info-main-div">
            <div class="blog-info-block row">
              <div class="blog-info-item-div col-xs-3">已关注：<span class="blog-info-item-value">{{followingNum}}</span></div>
              <div class="blog-info-item-div col-xs-3">粉丝：<span class="blog-info-item-value">{{followerNum}}</span></div>
              <div class="blog-info-item-div col-xs-3">我的点赞：<span class="blog-info-item-value">{{followerNum}}</span></div>
              <div class="blog-info-item-div col-xs-3">我的收藏：<span class="blog-info-item-value">{{followerNum}}</span></div>
            </div>

            <div class="account-other-info-list">
              <div class="other-info-item row" v-for="(item, index) in otherInfoList" :key="index">
                <div class="col-xs-10 other-info-left">{{item.infoName}}：{{item.infoValue}}</div>
                <div class="col-xs-2 other-info-right">
                  <span v-if="item.infoPrivate">保密</span>
                  <span v-else>公开</span>
                </div>
              </div>
            </div>

            <div class="other-links-div">
              <p class="other-links-p">@ 其他链接</p>
              <div class="other-link-item other-info-item" v-for="(item, index) in otherLinks" :key="index">
                {{index+1}}、{{item.linkName}}：<a :href="item.linkUrl" target="_blank" class="other-link-a">{{item.linkUrl}}</a>
              </div>
            </div>

            <div class="register-time-div">
              我在 {{registerTime}} 加入了“轻摇”博客大家庭！
            </div>



          </div>

        </div>
      </div>


      <!--修改信息页面-->
      <div v-else class="account-main-div">
        <div class="head-img-div">
          <img :src="userAvatarUrl" class="head-img modify-head-img">
          <p class="modify-avatar-p">
            <!--图片上传：https://blog.csdn.net/qq_40090843/article/details/88421271，后台需查询虚拟路径-->
            <span class="modify-avatar-span" @click="clickUploadAvatar()">修改头像</span>
            <input type="file" id="upload-avatar" @change="modifyAvatar($event)" style="display: none">
          </p>
        </div>

        <div class="modify-account-info-list">
          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">用户名: <span class="modify-info-item-title-warning">（用户名已存在，请重新选择）</span></span>
              <span class="modify-info-item-private-span">
                <button class="private-btn"><i class="fa fa-lock" aria-hidden="true"></i> 保密</button>
                <button class="private-btn"><i class="fa fa-unlock" aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div">
              <input type="text" class="modify-input-text">
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">性别:</span>
              <span class="modify-info-item-private-span">
                <button class="private-btn"><i class="fa fa-lock" aria-hidden="true"></i> 保密</button>
                <button class="private-btn"><i class="fa fa-unlock" aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div modify-account-info-item-input-div-left">
              <button class="private-btn sex-btn"><span class="iconfont icon-female"></span> 女</button>
              <button class="private-btn sex-btn"><span class="iconfont icon-male"></span> 男</button>
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">个性签名: <span class="modify-info-item-title-warning">（用户名已存在，请重新选择）</span></span>
              <span class="modify-info-item-private-span">
                <button class="private-btn"><i class="fa fa-lock" aria-hidden="true"></i> 保密</button>
                <button class="private-btn"><i class="fa fa-unlock" aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div">
              <textarea class="modify-input-text" placeholder="还可输入64个字" maxlength="64"></textarea>
            </div>
          </div>





          <div class="doUpdate-div">
            <button class="doSubmit-btn">提交</button>
          </div>

        </div>
      </div>
      <BaseBottomBar/>
      <BaseLive2d/>
    </div>
</template>

<script>
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import "../../style/iconfont/iconfont.css";
    import "../../style/iconfont/iconfont.js";



    export default {
        name: "UserAccountManager",
        components: {BaseLive2d, BaseBottomBar, BaseTopBar},
        data: function() {
          return {
            userName: '鬼鬼',
            userId: 11,
            userMotto: '致虚极，守静笃',
            userAvatarUrl: '/static/head/8.jpg',
            followingNum: 12,     /*关注的人的数量*/
            followerNum: 20,       /*粉丝数量*/
            showModify: true,      /*是否在做修改*/
            avatarFile: '',       /*头像文件*/
            otherInfoList: [{
                infoName: '性别',
                infoValue: '男',
                infoPrivate: true
              },
              {
                infoName: '出生日期',
                infoValue: '1999-01-14',
                infoPrivate: true
              },
              {
                infoName: '自我描述',
                infoValue: '我是一个乐天派',
                infoPrivate: true
              },
              {
                infoName: '我的位置',
                infoValue: '中国长沙',
                infoPrivate: false
              }
            ],
            otherLinks: [{
              linkName: 'Github地址',
              linkUrl: 'http://www.github.com/yinyoupoet'
            },{
              linkName: 'Github地址',
              linkUrl: 'http://www.github.com/yinyoupoet'
            },{
              linkName: 'Github地址',
              linkUrl: 'http://www.github.com/yinyoupoet'
            }],
            registerTime: '2019-01-01 01:01:01'
          }
      },
      methods: {
        clickUploadAvatar: function() {
          $('#upload-avatar').click();
        },
        modifyAvatar: function(event) {
          this.avatarFile = event.target.files[0];
          // console.log(this.avatarFile)

          let formData = new FormData();
          formData.append("avatar", this.avatarFile);
          formData.append("userId", this.userId);
          this.$http.post('http://127.0.0.1:8080/upload/avatar', formData)
            .then((response) => {
              console.log(response)
              if(response == null){
                alert("头像上传失败，请重试");
                // 一定要在失败的时候清空【input file】的value，否则下次选同一张图不会触发本事件
                $('#upload-avatar').val("");
                return;
              }
              // 上传失败
              if(response.data.state == "false"){
                alert(response.data.reason);
                $('#upload-avatar').val("");
                return;
              }
              // 否则上传成功了
              if(response.data.state == "true" && response.data.avatarUrl.trim() != ""){
                this.userAvatarUrl = response.data.avatarUrl;
              }
            }).catch((exception) => {
              console.log(exception);
              alert("头像上传失败，请重试");
              // 一定要在失败的时候清空【input file】的value，否则下次选同一张图不会触发本事件
              $('#upload-avatar').val("");
              return;
          });

        }
      }
    }
</script>

<style scoped>
  .account-main-div {
    margin: auto;
    margin-top: 100px;
    width: 850px;
    position: relative;
    background: #fe6646;
    border-radius: 3px;
    box-shadow:  0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    transition: all .3s ease;
    padding: 0 10px 40px;
  }

  .head-img-div{
    position: relative;
    width: 100%;
  }

  .head-img{
    position: absolute;
    width: 96px;
    height: 96px;
    top: -48px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  }

  .change-option-div {
    text-align: right;
    padding: 10px 8px;
  }

  .change-span{
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    transition: all 0.3s;
    padding-bottom: 3px;
  }

  .change-span:hover{
    color: #fff;
    text-shadow: 0 0 5px rgba(255,255,255,0.6);
  }


  .account-info-div {
    margin-top: -10px;
  }

  .account-user-name {
    text-align: center;
    margin-top: 15px;
    color: #fff;
    font-size: 1.25em;
  }

  .account-user-motto {
    text-align: center;
    margin-top: 5px;
    color: rgba(255,255,255,0.8);
    font-size: 1.1em;
  }

  .blog-info-block {
    margin: 5px 10px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }


  .blog-info-item-div{
    padding: 10px;
    color: #fff9c4;
    cursor: pointer;
    transition: all 0.5s;
    text-align: center;
  }

  .blog-info-item-div:hover{
    /*box-shadow: 1px 1px 5px #fff;*/
    /*text-shadow: 1px 1px 100px #fff;*/
    color: #000;
  }

  .blog-info-item-value{
    font-weight: 600;
    text-shadow: 1px 1px 100px #fff;
  }

  .other-info-item{
    padding: 5px 5px;
    color: #fff;
    margin: 2px 10px;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(0,0,0,0);
    border-radius: 5px;
    font-size: 1.1em;
  }

  .other-info-item:hover{
    background: #fff;
    border: 1px solid #ccc;
    color: #fe6646;
    cursor: pointer;
  }

  .other-links-div{
    padding: 0 10px;
    margin-top: 10px;
    color: #fff;
  }

  .other-links-p{
    letter-spacing: 1px;
    font-weight: 800;
    padding-left: 20px;
  }

  .other-link-a{
    color: #5d4037;
    text-decoration:none;
  }

  .other-link-a:link {
    color: #5d4037;
    text-decoration:none;
    cursor:pointer;
  }
  .other-link-a:active{
    color: #5d4037;
    cursor:pointer;
  }
  .other-link-a:visited {
    color: #5d4037;
    text-decoration:none;
    cursor:pointer;
  }
  .other-link-a:hover {
    color: #fe6646;
    text-decoration:none;
    cursor:pointer;
  }

  .register-time-div{
    color: #fff;
    text-align: center;
    margin: 30px 30px 0;
    padding: 20px;
    border-top: 1px solid #fff;
  }

  .modify-head-img {

  }

  .modify-avatar-p {
    text-align: center;
    padding-top: 60px;
  }
  .modify-avatar-span {
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
  }

  .modify-avatar-span:hover{
    background: #fff;
    color: #fe6646;
  }

  .modify-account-info-list{
    padding: 15px 0;
  }

  .modify-info-item-title-span{
    color: #fff;
    font-size: 1.2em;
    margin-right: 20px;
    display: inline-block;
    margin-top: 6px;
  }

  .modify-info-item-private-span{
    float: right;
    color: #fff;
    margin-right: 20px;
  }

  .private-btn{
    border: 1px solid #ddd;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 5px 8px;

    color: #fff;
    font-size: 14px;
    text-decoration: none;
    line-height: 1;
    transition: all 0.3s;
    background: transparent;
    font-weight: 500;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, STHeiti, WenQuanYi Micro Hei, Helvetica, Arial, sans-serif;
    letter-spacing: 2px;
  }

  .private-btn:hover{
    background: #786450;
    border: 1px solid #786450;
  }

  .modify-account-info-item-input-div{
    margin-top: 6px;
    text-align: center;
  }

  .modify-account-info-item{
    margin-bottom: 18px;
  }

  .modify-input-text{
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 8px;
    outline: none;
  }


  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  .modify-account-info-item-input-div-left {
    text-align: left;
  }
  .modify-info-item-title-warning{
    padding-left: 10px;
    color: #000;
    font-weight: 800;
  }

  .sex-btn{
    margin-right: 10px;
  }

  .doUpdate-div{
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    /*border-top: 1px solid #eee;*/
    padding-top: 15px;
    text-align: center;
  }


  .doSubmit-btn {
    padding: 30px;
    border: 3px solid #fff;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    background: transparent;
    color: #fff;
    font-size: 1.3em;
    cursor: pointer;
  }

  .doSubmit-btn:hover{
    background: #786450;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.3);
  }
</style>

