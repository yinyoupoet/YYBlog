<template>
  <div class="top-bar">
    <!--不是手机的时候-->
    <div class="container top-bar-container" v-if="!isMobil">
      <img src="../../assets/logo1_1.png" class="logo-img">
      <div class="topbar-right">
        <div class="search-div">
          <input type="text" class="search-input" placeholder="Search...">
        </div>
        <button v-for="btn of btns" class="common-btn top-btn">
          {{btn.value}}
        </button>
        <template v-if="isLogin">
          <img src="/static/head/1.jpg" class="head-img"/>
        </template>
        <template v-else>
          <button class="common-btn top-btn">
            登录/注册
          </button>
        </template>

      </div>
    </div>

    <!--是手机访问的情况-->
    <div class="container-fluid mobile-top-bar-container" v-if="isMobil">
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
      <div class="mobile-menu-cover" v-if="showMenu && isMobil" v-on:click="closeMenu">
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "BaseTopBar",
    data: function () {
      return {
        btns: [
          {
            value: "首页",
            href: "#"
          },
          {
            value: "友链",
            href: "#"
          }],
        isLogin: true,
        screenWidth: document.body.clientWidth,
        isMobil: false,
        authorName: '吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人吟游诗人',
        mobileWidth: 900,
        showMenu: false
      }
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth < this.mobileWidth) {
        this.isMobil = true
      } else {
        this.isMobil = false
      }
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          if (that.screenWidth < this.mobileWidth) {
            this.isMobil = true
          } else {
            this.isMobil = false
          }
        })()
      }
    },
    watch: {
      screenWidth(val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.timer = true
          let that = this

          if (val < this.mobileWidth) {
            this.isMobil = true
          } else {
            this.isMobil = false
          }


          setTimeout(function () {
            // 打印screenWidth变化的值
            //console.log(that.screenWidth)
            that.timer = false
          }, 400)
        }
      }
    },
    methods: {
      closeMenu: function () {
        this.showMenu = false;
      },
      openMenu: function () {
        this.showMenu = true;
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
    background: rgba(255,255,255,0.8);
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
  }

  .top-btn {
    margin: 5px;
  }

  .search-div {
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

</style>
