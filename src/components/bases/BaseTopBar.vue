<template>
  <div class="top-bar">
    <div class="container top-bar-container">
      <img src="../../assets/logo1_1.png" class="logo-img">
      <div class="topbar-right">
        <div class="search-div">
          <input type="text" class="search-input" placeholder="Search...">
        </div>
        <button v-for="btn of btns" class="common-btn top-btn">
          {{btn.value}}
        </button>
        <template v-if="isLogin">
          <img src="../../assets/head/1.jpg" class="head-img"/>
        </template>
        <template v-else>
          <button class="common-btn top-btn">
            登录/注册
          </button>
        </template>

      </div>
    </div>
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
        isLogin: true
      }
    }
  }
</script>

<style scoped>
  .top-bar {
    width: 100%;
    height: 56px;
    padding: 4px;
    background: #fff;
  }
  .top-bar-container{
    position: relative;
  }

  .logo-img {
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  .topbar-right{
    display: inline-block;
    text-align: right;
    width: 100%;
  }
  .top-btn{
    margin: 5px;
  }

  .search-div {
    display: inline-block;
    position: relative;
  }
  .search-input{
    border: none;
    border-bottom: 1px solid #5bc0de;
    padding: 8px 10px;
    outline: none;
  }
  .search-input:focus{
    border-bottom: 2px solid #5bc0de;
  }
  .head-img{
    width: 40px;
    height: 40px;
    border-radius: 50% 50%;
    cursor: pointer;
  }
</style>
