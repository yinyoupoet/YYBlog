<template>
  <div class="top-bar">
    <!--不是手机的时候-->
    <div class="container top-bar-container">
      <img src="../../assets/logo1_1.png" class="logo-img">
      <div class="topbar-right">
        <div class="search-div">
          <input type="text" class="search-input" placeholder="Search...">
        </div>



        <button v-for="(btn,index) of btns" class="common-btn top-btn" v-show="isLogin" @click="linkTo(btn.href)">
          {{btn.value}}<span v-if="index==0 && notify" class="notify-span"></span>
        </button>

        <template v-if="isLogin">
          <div class="avatar-div" @mouseover="showUserMenu=true"
               @mouseleave="showUserMenu=false">
              <img :src="userHeadImgUrl" class="head-img"/>
            <!--transition是用来渐变显示的，这样的好处其实是方便鼠标移动到外边那个div内部，如果不是渐变，很容易就移出去了-->
            <transition name="fade">
              <div class="user-menu" v-if="showUserMenu">
                <ul class="user-menu-ul">
                  <li class="user-menu-li">
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <router-link :to="'/userProfile/' + userId +''" class="user-menu-a">个人中心</router-link>
                  </li>
                  <li class="user-menu-li">
                    <!--<i class="fa fa-cog" aria-hidden="true"></i>-->
                    <i class="fa fa-meh-o" aria-hidden="true"></i>
                    <router-link :to="'/userAccountManager/' + userId+''" class="user-menu-a">账号设置</router-link>
                  </li>
                  <li class="user-menu-li">
                    <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
                    <router-link :to="'/user/' + userId+''" class="user-menu-a">我的博客</router-link>
                  </li>
                  <li class="user-menu-li">
                    <i class="fa fa-server" aria-hidden="true"></i>
                    <router-link :to="'/userBlogManager/' + userId+''" class="user-menu-a">博客管理</router-link>
                  </li>
                  <li class="user-menu-li">
                    <!--<i class="fa fa-empire" aria-hidden="true"></i>-->
                    <!--<i class="fa fa-frown-o" aria-hidden="true"></i>-->
                    <i class="fa fa-eye-slash" aria-hidden="true"></i>
                    <a href="#" class="user-menu-a" @click="signOut()">退出登录</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </template>
        <template v-else>
          <div class="avatar-div">
            <button class="common-btn top-btn" @click="appearLogin()">
              登录/注册
            </button>
          </div>
        </template>

      </div>
    </div>

    <!--是手机访问的情况-->
    <div class="container-fluid mobile-top-bar-container">
      <img src="../../assets/logo1_1.png" class="mobile-logo-img">
      <div class="mobile-top-bar-author">
        <span class="mobile-top-bar-author-text">{{authorName}}</span>
      </div>
      <div class="glyphicon glyphicon-th-list mobile-right-icon" v-on:click="openMenu">
      </div>
      <div class="mobile-menu-list" v-if="showMenu">
        <em></em>
        <ul class="mobile-menu-item-ul">
          <li>首页</li>
          <li>归档</li>
          <li>关于</li>
          <template v-if="isLogin">
            <li>个人中心</li>
          </template>
          <template v-else>
            <li>登录/注册</li>
          </template>
        </ul>
      </div>

    </div>


    <transition name="fade">
      <div class="mobile-menu-cover" v-if="showMenu" v-on:click="closeMenu">

      </div>
    </transition>


    <!--登录注册框-->
    <div class="login-register-bg-div" v-if="showLogin" @click="disappearLogin()">
      <div class="login-register-div" @click.stop="LoginDivClick()">
        <!--控制是登录还是注册-->
        <div class="login-register-option-div row">
          <div class="col-xs-6 login-option-div login-register-option"
               v-bind:class="loginOrRegister?'option-selected':'option-not-selected'"
               @click="selectLogin()">
            登录
          </div>
          <div class="col-xs-6 register-option-div login-register-option"
               v-bind:class="!loginOrRegister?'option-selected':'option-not-selected'"
               @click="selectRegister()">
            注册
          </div>
        </div>

        <!--登录页面-->
        <div class="login-page-div" v-if="loginOrRegister">
          <img src="../../assets/logo1_1.png" class="login-logo">
          <input class="input-style" placeholder="用户名" type="text" v-model="loginUserName"><br>
          <input class="input-style" placeholder="密码" type="password" v-model="loginUserPwd">
            <br>
          <button class="login-register-btn" @click="doLogin()">登录</button>
        </div>

        <!--注册页面-->
        <div class="register-page-div" v-if="!loginOrRegister">
          <img src="../../assets/logo1_1.png" class="register-logo">
          <input class="input-style" placeholder="用户名" type="text" v-model="loginUserName"><br>
          <input class="input-style" placeholder="密码" type="password" v-model="loginUserPwd">
          <input class="input-style" placeholder="记住密码" type="password" v-model="loginUserRepeatPwd">
          <br>
          <button class="login-register-btn" @click="doRegister()">注册</button>
        </div>



      </div>
    </div>

    <!--loading框-->
    <div v-if="showLoading" class="loading-main">
      <BaseLoading class="loading-div"></BaseLoading>
    </div>

  </div>
</template>

<script>

  import BaseLoading from "./BaseLoading";
  export default {
    name: "BaseTopBar",
    components: {BaseLoading},
    created(){
      // 刚进入页面，对页面进行初始化操作
      if(sessionStorage.getItem("isLogin") == null || sessionStorage.getItem("isLogin") == 'false'){
        this.isLogin = false;
      }else {
        // 其余初始化操作只需在用户已登录的前提下进行
        this.isLogin = true;
        this.userId = sessionStorage.getItem("userId");

        if(sessionStorage.getItem('userHeadImgUrl') != null){
          // 如果设置了头像
          this.userHeadImgUrl = sessionStorage.getItem('userHeadImgUrl');
        }else{
          var userName = sessionStorage.getItem("userName");
          var avatar = new mdAvatar({
            size: 100,
            text: userName
          });
          var tempSrc = avatar.toDataURL("image/png");
          this.userHeadImgUrl = tempSrc;
        }
      }
    },

    data: function () {
      return {
        btns: [
          {
            value: "消息",
            href: "#"
          },
          {
            value: "写博客",
            href: "/editor"
          }],
        notify: true, /*是否有新消息*/
        isLogin: false,
        authorName: '吟游诗人',
        showMenu: false,  /*手机访问的时候的菜单*/
        showLogin: false,  /*是否显示登录注册界面*/
        loginOrRegister: true,  /*true表示选中了login，false表示选中了register*/
        loginUserName: '',  /*登录注册用户名*/
        loginUserPwd: '',   /*登录注册用户密码*/
        loginUserRepeatPwd: '',  /*登录注册用户重复密码*/
        userHeadImgUrl: '',  /*用户头像图片地址，自己的*/
        showUserMenu: false,  /*用户移动鼠标到头像上，则会显示用户菜单*/
        showLoading: false,     /*用来在正在处理登录、注册时显示loading*/

        userId: '',       /*用户ID，只有在用户登录之后才会有，用处自然是很大的*/
      }
    },

    methods: {
      closeMenu: function () {
        this.showMenu = false;
      },
      openMenu: function () {
        this.showMenu = true;
      },
      appearLogin: function(){
        this.showLogin = true;
      },
      disappearLogin: function(){
        this.showLogin = false;
      },
      LoginDivClick: function () {
        // 啥也不干，为了屏蔽点击就消失的那个事件
      },
      selectLogin: function () {
        // 注册转登录或直接打开登录，不清密码
        this.loginOrRegister = true;
      },
      selectRegister: function() {
        // 登录转注册，清除密码
        this.loginUserPwd = '';
        this.loginUserRepeatPwd = '';

        this.loginOrRegister = false;
      },
      doLogin: function(){

        this.showLoading = true;

        if(this.loginUserName.trim() == ""){
          alert("请输入用户名");
          return;
        }
        if(this.loginUserPwd.trim() == ""){
          alert("请输入密码");
          return;
        }
        this.$http.post('http://127.0.0.1:8080/userInfo/login', {
          userName: this.loginUserName,
          userPwd: this.loginUserPwd.MD5()
        }).then((response) => {

          console.log(response);
          this.userId = response.data.userAccount.userId;


          if(response.data.state == 'false'){
            // 出错了
            var error = response.data.error;
            alert(error);
            this.showLoading = false;
            this.loginUserPwd = ''
            return;
          }
          // 否则就是登录成功了
          this.showLogin = false;
          this.isLogin = true;

          // 将登录状态存入sessionStorage
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("userId", response.data.userAccount.userId);
          sessionStorage.setItem("userName", response.data.userAccount.userName);

          //初始化头像
          var userName = sessionStorage.getItem("userName");
          var avatar = new mdAvatar({
            size: 100,
            text: userName
          });
          var tempSrc = avatar.toDataURL("image/png");
          this.userHeadImgUrl = tempSrc;


          this.showLoading = false;
        }).catch((error) => {
          console.log("error: " + error);
          alert("网络错误...");
          this.showLoading = false;
        });


      },
      doRegister: function() {

        this.showLoading = true;

        // 先验证用户名、密码等是否合法，合法才继续
        // 不过由于用户名重复等问题已经在后台进行了验证，因此前端可以稍微简单一点
        if(this.loginUserName.trim() == ""){
          alert("请输入用户名");
          return;
        }
        if(this.loginUserName.length > 16){
          alert("用户名长度不能大于16，请重试");
          return;
        }
        if(this.loginUserPwd != this.loginUserRepeatPwd){
          alert("两次输入的密码不一样，请重试");
          return;
        }
        if(this.loginUserPwd.length < 6 || this.loginUserPwd.length > 16){
          alert("密码长度应在6到16之间，请重试");
          return;
        }


        // 下面是验证成功后才执行的操作
        this.$http.post('http://127.0.0.1:8080/userInfo/register',{
            userName: this.loginUserName,
            userPwd: this.loginUserPwd.MD5()
        }).then((response) => {
          // 判断是成功还是失败了
          if(response.data.state == "false"){
            alert(response.data.error);

            this.showLoading = false;
            return;
          }
          // 否则就是登录成功了
          this.showLogin = false;
          this.isLogin = true;

          // 将登录状态存入sessionStorage
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("userId", response.data.userAccount.userId);
          sessionStorage.setItem("userName", response.data.userAccount.userName);


          //初始化头像
          var userName = sessionStorage.getItem("userName");
          var avatar = new mdAvatar({
            size: 100,
            text: userName
          });
          var tempSrc = avatar.toDataURL("image/png");
          this.userHeadImgUrl = tempSrc;


          this.showLoading = false;
        }).catch(function (error) {
          this.showLoading = false;
          console.log(error);
        });
      },
      signOut: function() {
        // 登出账号
        // 暂时先不提示
        sessionStorage.clear();
        this.isLogin = false;
        this.userId = ''
        this.showUserMenu = false
      },
      linkTo: function(url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  .top-bar {
    width: 100%;
    height: 56px;
    padding: 4px;
    /*background: #fff;*/
    background: #fafafa;
    min-width: 300px;
  }

  .top-bar-container {
    position: relative;
    z-index: 20;
  }

  .logo-img {
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    left: 4px;
  }

  .topbar-right {
    display: inline-block;
    text-align: right;
    width: 100%;
    padding-right: 50px;
  }

  .top-btn {
    margin: 5px;
  }

  .search-div {
    margin-top: 6px;
    display: inline-block;
    position: relative;

  }

  .search-input {
    border: none;
    border-bottom: 1px solid #5bc0de;
    padding: 8px 10px;
    outline: none;
    background: transparent;
  }

  .search-input:focus {
    border-bottom: 2px solid #5bc0de;
  }

  .head-img {
    width: 40px;
    height: 40px;
    border-radius: 50% 50%;
    cursor: pointer;
    position: absolute;
    margin-left: 10px;
    margin-top: 5px;
    z-index: 10;
  }

  .mobile-top-bar-container {
    padding: 4px;
    position: relative;
  }

  .mobile-logo-img {
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    left: 4px;
  }

  .mobile-top-bar-author {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 0;
    width: 100%;
  }

  .mobile-top-bar-author-text {
    display: inline-block;
    width: 160px;
    font-size: 20px;
    margin-top: 7px;
    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;
    word-wrap: normal;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-transform: translateX(5%);
    -moz-transform: translateX(5%);
    -ms-transform: translateX(5%);
    -o-transform: translateX(5%);
    transform: translateX(5%);
  }

  .mobile-right-icon {
    position: absolute;
    right: 4px;
    top: 4px;
    display: inline-block;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
    color: #AEDD81;
  }

  .mobile-menu-cover {
    position: fixed;
    background: #000;
    z-index: 10;
    width: 120%;
    height: 120%;
    left: -10%;
    top: -10%;
    opacity: 0.1;
  }

  .mobile-menu-list {
    position: absolute;
    right: 0px;
    top: 42px;
    background-color: #fefefe;
    padding: 0;
    width: 120px;
    border-radius: 5px;
    z-index: 102;
    box-shadow: -2px 5px 20px rgba(0, 0, 0, 0.3);
  }

  .mobile-menu-list em {
    z-index: 102;
    display: block;
    position: absolute;
    border-width: 6px;
    top: -12px;
    right: 8px;
    border-style: solid dashed dashed;
    border-color: transparent transparent #fff;
  }

  .mobile-menu-item-ul {
    width: 100%;
    height: 100%;
    padding: 0;
    list-style-type: none;
    margin: 0;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, STHeiti, WenQuanYi Micro Hei, Helvetica, Arial, sans-serif;
  }

  .mobile-menu-item-ul li {
    color: #F1562A;
    color: #7BB137;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    padding: 10px 15px;
    outline: none;
    cursor: pointer;
  }

  .mobile-menu-item-ul li:hover {
    color: #F1562A;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @media screen and (max-width: 899px) {
    .top-bar-container{
      display: none;
    }
    .mobile-top-bar-container{
      display: block;
    }
  }

  @media screen and (min-width: 900px) {
    .mobile-top-bar-container{
      display: none;
    }
    .top-bar-container{
      display: block;
      padding-right: 100px;
    }
  }


  .login-register-bg-div{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 30;
    padding-left: 0;
  }


  @media screen  and (max-height: 667px) {
    .login-register-div{
      height: 60%;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      z-index: 40;
    }
  }
  @media screen  and (min-height: 668px) {
    .login-register-div{
      height: 400px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      z-index: 40;
    }
  }

  .login-register-div{
    /*border-radius: 20px;*/
    width: 400px;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.3);
    outline: none;
    overflow-y: auto;
  }

  .login-register-option-div{
    text-align: center;
    margin: 0;
  }

  .login-register-option{
    padding: 15px;
    cursor: pointer;
    color: #777;
    transition: all 0.5s;
    font-size: 1.25em;
    font-weight: 400;
  }

  .option-selected:hover{
    box-shadow: inset 0 0 20px #e2d1c3;
  }

  .option-selected{
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
  }
  .option-not-selected:hover{
    color: #f1562a;
    text-shadow: 0px 0px 20px #e87b00;
  }


  .login-option-div{
    border-bottom: 1px solid #ccc;
  }
  .register-option-div{
    border-bottom: 1px solid #ccc;
  }

  .login-page-div{
    padding: 30px 30px 20px;
    text-align: center;
  }

  .input-style{
    width: 80%;
    margin-bottom: 15px;
    line-height: 2em;
    padding: 0 8px 8px;
    outline: none;
    border-radius: 2px;
    border: none;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
    font-size: 1em;
    letter-spacing: 1px;

  }

  .input-style:focus{
    border-bottom: 2px solid #e87b00;
  }

  .login-logo{
    height: 80px;
    margin-bottom: 40px;
  }

  .login-register-btn{
    padding: 10px 25px;
    outline: none;
    background: #fff;
    color: #558b2f;
    text-shadow: 0px 0px 1px rgba(0,0,0,0.3);
    font-weight: 400;
    border: 2px solid #7cc374;
    border-radius: 5px;
    transition: all 0.5s;
    font-weight: 400;
  }

  .login-register-btn:hover{
    background: #7cc374;
    color: #fff;
    box-shadow: 0 0 10px #558b2f;
  }

  .register-page-div{
    padding: 25px 30px 15px;
    text-align: center;
  }

  .register-logo{
    height: 60px;
    margin-bottom: 30px;
  }


  .avatar-div {
    display: inline-block;
    position: absolute;
  }

  .user-menu{
    width: 120px;
    background: #fafafa;
    position: absolute;
    margin-top: 40px;
    padding-top: 20px;
    z-index: 9;
    border-radius: 0 0 10px 10px;
    box-shadow:0px 15px 10px -15px #999;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .user-menu-ul{
    list-style: none;

  }

  .user-menu-li{
    display: block;
    padding: 5px;
    padding-right: 20px;
    line-height: 1.5em;
    color: #999;
  }
  .user-menu-li:hover{
    background: #eee;
  }

  .user-menu-a{
    margin-left: 5px;
    cursor:pointer;
    color: #e87b00;
    font-family: "Comic Sans MS", "Helvetica Neue", 微软雅黑, "Microsoft Yahei", "Microsoft Yahei", -apple-system, sans-serif;
    transition: all 0.5s;
  }
  .user-menu-a:link {
    color: #e87b00;
    text-decoration:none;
    cursor:pointer;
  }
  .user-menu-a:active{
    color: #e87b00;
    cursor:pointer;
  }
  .user-menu-a:visited {
    color: #e87b00;
    text-decoration:none;
    cursor:pointer;
  }
  .user-menu-a:hover {
    color: #fff;
    /*text-shadow: rgb(69, 45, 45) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 2px;*/
    text-shadow: #000 0px 1px 1px, #000 -1px 0px 2px, #000 0 0 5px;
    text-decoration:none;
    cursor:pointer;
  }


  .notify-span {
    display: inline-block;
    position: absolute;
    width: 6px;
    height: 6px;
    background: #f1562a;
    border-radius: 50%;
  }

  .loading-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .loading-main {
    position: fixed;
    z-index: 50;
    background: rgba(0,0,0,0);
    width: 99%;
    height: 100%;
  }
</style>
