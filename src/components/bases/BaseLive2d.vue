<template>
  <div>
    <div id="landlord" style="left:5px;bottom:0px;">
      <!--<div class="message" style="opacity:0"></div>-->
      <div class="message"></div>
      <canvas id="live2d" width="500" height="560" class="live2d"></canvas>
      <!--<canvas id="live2d" width="300" height="336" class="live2d"></canvas>-->
      <div class="live_talk_input_body" style="display: none;">
        <div class="live_talk_input_name_body">
          <input name="name" type="text" class="live_talk_name white_input" id="AIuserName" autocomplete="off"
                 placeholder="你的名字"/>
        </div>
        <div class="live_talk_input_text_body">
          <input name="talk" type="text" class="live_talk_talk white_input" id="AIuserText" autocomplete="off"
                 placeholder="要和我聊什么呀？"/>
          <button type="button" class="live_talk_send_btn" id="talk_send">发送</button>
        </div>
      </div>
      <input name="live_talk" id="live_talk" value="1" type="hidden"/>
      <div class="live_ico_box">
        <div class="live_ico_item type_info" id="showInfoBtn"></div>
        <div class="live_ico_item type_talk" id="showTalkBtn" style="display: none"></div>
        <div class="live_ico_item type_music" id="musicButton"></div>
        <div class="live_ico_item type_youdu" id="youduButton"></div>
        <div class="live_ico_item type_quit" id="hideButton"></div>
        <input name="live_statu_val" id="live_statu_val" value="0" type="hidden"/>
        <!--真正的音乐播放器-->
        <audio src="" style="display:none;" id="live2d_bgm" data-bgm="0" preload="none"></audio>
        <!--音乐列表-->
        <input name="live2dBGM" v-for="bgm of bgms" v-bind:value="bgm" type="hidden">
        <input id="duType" value="douqilai,l2d_caihong" type="hidden">
      </div>
    </div>

    <div id="open_live2d">召唤 ('ω') </div>
  </div>
</template>

<script>
  var jquery = require('./../../style/jquery-3.1.1.min')
  var talkAPI = "";//如果有类似图灵机器人的聊天接口请填写接口路径
  var message_Path = "/static/";
  var live2d = require("./../../live2d/js/live2d.js")
  var message = require("./../../live2d/js/message.js")

  export default {
    name: "BaseLive2d",
    data: function () {
      return {
        bgms: ["http://other.web.ra01.sycdn.kuwo.cn/resource/n1/fromape/16/9516.mp3","http://sb.sycdn.kuwo.cn/resource/n1/99/52/3524054497.mp3","http://www.ytmp3.cn/down/57880.mp3","http://www.ytmp3.cn/down/57877.mp3"]
      }
    }
  }
</script>

<style scoped>

</style>
