<template>
  <div id="app">
    <BaseTopBar></BaseTopBar>
    <router-view></router-view>
    <BaseLive2d></BaseLive2d>
  </div>
</template>

<script>


  import BaseTopBar from "./components/bases/BaseTopBar";
  import BaseLive2d from "./components/bases/BaseLive2d";

  export default {
    name: 'App',
    components: {BaseLive2d, BaseTopBar}
  }

  /*import "https://apps.bdimg.com/libs/jquery/1.7.1/jquery.min.js";*/

</script>

<!--
<script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/1.7.1/jquery.min.js"></script>
<script>
  var message_Path = '/live2d/';//资源目录，如果目录不对请更改
  var talkAPI = "";//如果有类似图灵机器人的聊天接口请填写接口路径
</script>
<script type="text/javascript" src="live2d/js/live2d.js"></script>
<script type="text/javascript" src="live2d/js/message.js"></script>-->

<style>

</style>
