<template>
    <div>

      <BaseTopBar ref="topbar"/>


      <!--显示信息页面-->
      <div class="account-main-div" v-if="!showModify">
        <div class="head-img-div">
          <img class="head-img" :src="userAvatarUrl">
        </div>
        <div class="change-option-div">
          <span class="change-span" @click="()=>{showModify = true}">修改资料</span><br/>
          <span class="change-pwd" @click="()=>{showModifyPwd = true}">修改密码</span>
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
              <div class="blog-info-item-div col-xs-3">收到的点赞：<span class="blog-info-item-value">{{followerNum}}</span>
              </div>
              <div class="blog-info-item-div col-xs-3">我的收藏夹：<span class="blog-info-item-value">{{followerNum}}</span>
              </div>
            </div>

            <div class="account-other-info-list">
              <div class="other-info-item row">
                <div class="col-xs-10 other-info-left">{{genderPart.infoName}}：{{genderPart.infoValue}}</div>
                <div class="col-xs-2 other-info-right">
                  <span v-if="genderPart.infoPrivate">保密</span>
                  <span v-else>公开</span>
                </div>
              </div>
              <div class="other-info-item row">
                <div class="col-xs-10 other-info-left">{{birthPart.infoName}}：{{birthPart.infoValue}}</div>
                <div class="col-xs-2 other-info-right">
                  <span v-if="birthPart.infoPrivate">保密</span>
                  <span v-else>公开</span>
                </div>
              </div>
              <div class="other-info-item row">
                <div class="col-xs-10 other-info-left">{{descriptionPart.infoName}}：{{descriptionPart.infoValue}}</div>
                <div class="col-xs-2 other-info-right">
                  <span v-if="descriptionPart.infoPrivate">保密</span>
                  <span v-else>公开</span>
                </div>
              </div>
              <div class="other-info-item row">
                <div class="col-xs-10 other-info-left">{{locationPart.infoName}}：{{locationPart.infoValue}}</div>
                <div class="col-xs-2 other-info-right">
                  <span v-if="locationPart.infoPrivate">保密</span>
                  <span v-else>公开</span>
                </div>
              </div>
            </div>


            <div class="other-links-div">
              <p class="other-links-p">@ 其他链接</p>
              <div class="other-link-item other-info-item" v-for="(item, index) in otherLinks" :key="index"
                   v-if="item!=null && item.linkUrl != null && item.linkUrl.trim()!=''">
                {{index+1}}、{{item.linkName}}<span
                v-if="item!=null && item.linkName != null && item.linkName.trim() != ''">：</span> <a
                :href="item.linkUrl" target="_blank" class="other-link-a">{{item.linkUrl}}</a>
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
              <span class="modify-info-item-title-span">用户名: <span class="modify-info-item-title-warning">{{warningUserName}}</span></span>
            </div>
            <div class="modify-account-info-item-input-div">
              <input type="text" class="modify-input-text" v-model="userName" @blur="checkDuplicateUserName()">
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">个性签名: <span class="modify-info-item-title-warning">{{warningUserMotto}}</span></span>
            </div>
            <div class="modify-account-info-item-input-div">
              <textarea class="modify-input-text" placeholder="还可输入64个字" maxlength="64" v-model="userMotto"></textarea>
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">{{genderPart.infoName}}:</span>
              <span class="modify-info-item-private-span">
                <button class="private-btn" v-bind:class="{'private-select': genderPart.infoPrivate}"
                        @click="()=>{genderPart.infoPrivate=true}"><i class="fa fa-lock"
                                                                      aria-hidden="true"></i> 保密</button>
                <button class="private-btn" v-bind:class="{'private-select': !genderPart.infoPrivate}"
                        @click="()=>{genderPart.infoPrivate=false}"><i class="fa fa-unlock"
                                                                       aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div modify-account-info-item-input-div-left">
              <button class="private-btn sex-btn" v-bind:class="{'private-select': genderPart.infoValue == '女'}"
                      @click="()=>{genderPart.infoValue='女'}"><span class="iconfont icon-female"></span> 女
              </button>
              <button class="private-btn sex-btn" v-bind:class="{'private-select': genderPart.infoValue == '男'}"
                      @click="()=>{genderPart.infoValue='男'}"><span class="iconfont icon-male"></span> 男
              </button>
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">{{birthPart.infoName}}: </span>
              <span class="modify-info-item-private-span">
                <button class="private-btn" v-bind:class="{'private-select': birthPart.infoPrivate}"
                        @click="()=>{birthPart.infoPrivate=true}"><i class="fa fa-lock"
                                                                     aria-hidden="true"></i> 保密</button>
                <button class="private-btn" v-bind:class="{'private-select': !birthPart.infoPrivate}"
                        @click="()=>{birthPart.infoPrivate=false}"><i class="fa fa-unlock"
                                                                      aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div modify-birth-div">
              <input type="date" class="data-picker" v-model="birthPart.infoValue">
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">{{descriptionPart.infoName}}: <span
                class="modify-info-item-title-warning">{{warningDescription}}</span></span>
              <span class="modify-info-item-private-span">
                <button class="private-btn" v-bind:class="{'private-select': descriptionPart.infoPrivate}"
                        @click="()=>{descriptionPart.infoPrivate=true}"><i class="fa fa-lock" aria-hidden="true"></i> 保密</button>
                <button class="private-btn" v-bind:class="{'private-select': !descriptionPart.infoPrivate}"
                        @click="()=>{descriptionPart.infoPrivate=false}"><i class="fa fa-unlock" aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div">
              <textarea class="modify-input-text" placeholder="还可输入255个字" maxlength="255"
                        v-model="descriptionPart.infoValue"></textarea>
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">{{locationPart.infoName}}:</span>
              <span class="modify-info-item-private-span">
                <button class="private-btn" v-bind:class="{'private-select': locationPart.infoPrivate}"
                        @click="()=>{locationPart.infoPrivate=true}"><i class="fa fa-lock"
                                                                        aria-hidden="true"></i> 保密</button>
                <button class="private-btn" v-bind:class="{'private-select': !locationPart.infoPrivate}"
                        @click="()=>{locationPart.infoPrivate=false}"><i class="fa fa-unlock" aria-hidden="true"></i> 公开</button>
              </span>
            </div>
            <div class="modify-account-info-item-input-div">
              <input type="text" class="modify-input-text" v-model="locationPart.infoValue">
            </div>
          </div>

          <div class="modify-account-info-item">
            <div class="modify-info-item-title-div">
              <span class="modify-info-item-title-span">其他链接:<span class="notice-link">(注：只输入链接名不输入URL无效)</span></span>
            </div>
            <div class="modify-account-info-item-input-div row" v-for="(item, index) in otherLinks" :key="index">
              <div class="col-xs-3 other-link-item-side"><input type="text" class="modify-input-text" placeholder="链接名"
                                                                v-model="item.linkName"></div>
              <div class="col-xs-9 other-link-item-side"><input type="text" class="modify-input-text"
                                                                placeholder="链接URL" v-model="item.linkUrl"></div>
            </div>
          </div>

          <div class="doUpdate-div">
            <button class="doSubmit-btn" @click="updateUserInfo()">提交</button>
          </div>

        </div>
      </div>
      <BaseBottomBar/>
      <BaseLive2d/>


      <!--修改密码框-->
      <div v-if="showModifyPwd" class="modify-pwd-main">
        <div class="modify-pwd-div">
          <div class="modify-pwd-title-div">
            修改密码
          </div>
          <div class="modify-pwd-op-div">
            <span class="modify-pwd-op-title">原始密码</span>
            <input type="password" class="modify-input-text" v-model="originPwd">
          </div>
          <div class="modify-pwd-op-div">
            <span class="modify-pwd-op-title">新密码</span>
            <input type="password" class="modify-input-text" v-model="newPwd">
          </div>
          <div class="modify-pwd-op-div">
            <span class="modify-pwd-op-title">再次输入新密码</span>
            <input type="password" class="modify-input-text" v-model="newAgainPwd">
          </div>
          <div class="modify-pwd-op-btn-div">
            <button class="cancel-modify-pwd-btn" @click="cancelChangePwd()">取消</button>
            <button class="do-modify-pwd-btn" @click="doChangePwd()">确定修改</button>

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
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import "../../style/iconfont/iconfont.css";
    import "../../style/iconfont/iconfont.js";


    export default {
        name: "UserAccountManager",
        components: {BaseLive2d, BaseBottomBar, BaseTopBar},
      created() {
        var userId = sessionStorage.getItem("userId");
        // 如果没有登录，则退出页面并进行重新登录
        if (userId == null) {
          sessionStorage.clear();
          alert("请先登录");
          this.$router.push({
            path: '/',
            query: {
              isLogin: false,
              showLogin: true
            }
          });
          return;
        }

        this.userId = userId;

        // 如果已经登录了，那么从远程获取信息
        this.$http.post('http://127.0.0.1:8080/userInfo/manageInit', {
          userId: userId
        }).then((response) => {
          //console.log(response);
          // 获取数据错误
          if (response.data.state == 'false') {
            this.initError(response.data.error);
            return;
          }

          // 否则获取数据成功
          this.userName = response.data.userName;
          this.userMotto = response.data.userInfo.userMotto;
          this.userAvatarUrl = response.data.userInfo.userAvatarUrl;
          if (this.userAvatarUrl == null || this.userAvatarUrl.trim() == '') {
            this.generateAvatar(this.userName);
          }
          this.followingNum = response.data.userInfo.followingNum;
          this.followerNum = response.data.userInfo.followerNum;
          var genderPart = {
            'infoName': '性别',
            'infoValue': response.data.userInfo.gender,
            'infoPrivate': response.data.userInfo.genderPrivate == 0 ? false : true
          };
          var birthPart = {
            'infoName': '出生日期',
            'infoValue': response.data.birthDate,
            'infoPrivate': response.data.userInfo.birthPrivate == 0 ? false : true
          };
          var descriptionPart = {
            'infoName': '自我描述',
            'infoValue': response.data.userInfo.userDescription,
            'infoPrivate': response.data.userInfo.descriptionPrivate == 0 ? false : true
          };
          var locationPart = {
            'infoName': '我的位置',
            'infoValue': response.data.userInfo.location,
            'infoPrivate': response.data.userInfo.locationPrivate == 0 ? false : true
          };

          this.genderPart = genderPart;
          this.birthPart = birthPart;
          this.descriptionPart = descriptionPart;
          this.locationPart = locationPart;

          this.otherLinks = new Array();
          var linkList = response.data.userLinkList;
          var i = 0;
          for (; i < linkList.length; i++) {
            if (i > 2) break;
            var l = {
              'linkName': linkList[i].linkName,
              'linkUrl': linkList[i].linkUrl
            };
            this.otherLinks.push(l);
          }
          for (; i < 3; i++) {
            var l = {
              'linkName': '',
              'linkUrl': ''
            };
            this.otherLinks.push(l);
          }

          this.registerTime = response.data.registerTime;


        }).catch((exception) => {
          console.log(exception);
          this.initError(exception);
          return;
        });


      },
        data: function() {
          return {
            userName: '',
            userId: 0,
            userMotto: '',
            userAvatarUrl: '',
            followingNum: 0,     /*关注的人的数量*/
            followerNum: 0,       /*粉丝数量*/
            showModify: false,      /*是否在做修改*/
            avatarFile: '',       /*头像文件*/
            otherLinks: [],
            registerTime: '',
            warningUserName: '',
            warningUserMotto: '',
            genderPart: '',
            birthPart: '',
            descriptionPart: '',
            locationPart: '',
            warningDescription: '',
            showLoading: false,
            showModifyPwd: false,
            originPwd: '',
            newPwd: '',
            newAgainPwd: ''
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

        },
        initError: function (exception) {
          console.log(exception);
          console.log("错误");
          alert("初始化错误，请稍后重试");
          /*this.$router.push({
              path: '/'
            });*/
        },
        generateAvatar: function (userName) {
          var avatar = new mdAvatar({
            size: 100,
            text: userName
          });
          var tempSrc = avatar.toDataURL("image/png");
          this.userAvatarUrl = tempSrc;
        },
        updateUserInfo: function () {
          this.showLoading = true;

          if (this.userName == null || this.userName.trim() == "") {
            alert("请输入用户名");
            this.showLoading = false;
            return;
          }
          if (this.userName.length > 16) {
            alert("用户名长度不能大于16，请重试");
            this.showLoading = false;
            return;
          }

          // 对用户信息进行更新
          var avatarUrl = this.userAvatarUrl;
          if (avatarUrl.startsWith('data')) {
            avatarUrl = '';
          }
          var userName = this.userName;
          var userId = this.userId;
          var userMotto = this.userMotto;
          var gender = this.genderPart.infoValue;
          var genderPrivate = this.genderPart.infoPrivate;
          var birthDate = this.birthPart.infoValue;
          var birthPrivate = this.birthPart.infoPrivate;
          var description = this.descriptionPart.infoValue;
          var descriptionPrivate = this.descriptionPart.infoPrivate;
          var location = this.locationPart.infoValue;
          var locationPrivate = this.locationPart.infoPrivate;

          var otherLink = this.otherLinks;

          /*console.log(userId + " : " + userMotto + " : " + gender);
          console.log(genderPrivate + " : " + birthDate + " : " + birthPrivate);
          console.log(description + " : " + descriptionPrivate + " : " + location);
          console.log(locationPrivate + " : " + userName);
          console.log(otherLink);*/
          this.$http.post("http://127.0.0.1:8080/userInfo/updateUserInfo", {
            userId: userId,
            userName: userName,
            avatarUrl: avatarUrl,
            userMotto: userMotto,
            gender: gender,
            genderPrivate: genderPrivate,
            birthDate: birthDate,
            birthPrivate: birthPrivate,
            description: description,
            descriptionPrivate: descriptionPrivate,
            location: location,
            locationPrivate: locationPrivate,
            otherLink: otherLink
          }).then((response) => {
            console.log(response);
            if (response.data.state == "true" || response.data.state == true) {
              // 成功
              this.$refs.topbar.userHeadImgUrl = this.userAvatarUrl;
              this.showModify = false;
              if (!this.userAvatarUrl.startsWith("data")) {
                sessionStorage.setItem("userHeadImgUrl", this.userAvatarUrl);
              }
              this.showLoading = false;
              return;
            } else {
              // 否则是失败了
              alert(response.data.error);
              this.showLoading = false;
              return;
            }
          }).catch((exception) => {
            console.log(exception);
            alert("网络错误，数据更新失败");
            this.showLoading = false;
            return;
          });

        },
        checkDuplicateUserName: function () {
          //console.log("用户名查重+用户名长度检测");
          if (this.userName.length > 16) {
            this.warningUserName = "(用户名长度不能超过16个字符)";
          }

          this.$http.post('http://127.0.0.1:8080/userInfo/checkRename', {
            userId: this.userId,
            userName: this.userName
          })
            .then((response) => {
              //console.log(response);
              if (response.data.isExist == 'true' || response.data.isExist == true) {
                console.log("isTrue");
                this.warningUserName = "(用户名已存在，请重试)";
              } else {
                this.warningUserName = "";
              }
            }).catch((exception) => {
            console.log(exception);
            alert("网络错误，请检查网络状态后重试");
            return;
          })
        },
        cancelChangePwd: function () {
          this.originPwd = ''
          this.newPwd = ''
          this.newAgainPwd = ''
          this.showModifyPwd = false
        },
        doChangePwd: function () {
          this.showLoading = true;
          if (this.newPwd != this.newAgainPwd) {
            alert("两次输入的密码不一样，请重试");
            this.newPwd = '';
            this.newAgainPwd = '';
            this.showLoading = false;
            return;
          }

          if (this.newPwd.length < 6 || this.newPwd.length > 16) {
            alert("密码长度应在6到16之间，请重试");
            this.showLoading = false;
            return;
          }

          var userId = this.userId;
          this.$http.post('http://127.0.0.1:8080/userInfo/modifyPwd', {
            userId: userId,
            userPwd: this.originPwd.MD5(),
            userNewPwd: this.newPwd.MD5()
          }).then((response) => {
            //console.log(response);
            if (response.data.state == 'true' || response.data.state == true) {
              // 成功
              alert("密码修改成功");
              this.originPwd = '';
              this.newPwd = '';
              this.newAgainPwd = '';
              this.showLoading = false;
              this.showModifyPwd = false;
            } else {
              alert(response.data.error);
              this.originPwd = '';
              this.showLoading = false;
            }
          }).catch((exception) => {
            console.log(exception);
            alert("网络错误，请重试");
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
    -o-object-fit: cover;
    object-fit: cover;
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

  .change-pwd {
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s;
    padding-bottom: 3px;
    margin-top: 3px;
    display: inline-block;
  }

  .change-pwd:hover {
    color: #fff;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
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
    margin-top: 5px;
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

  .private-select {
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
    display: inline-block;
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
    padding: 10px 60px;
    border: 3px solid #fff;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    background: transparent;
    color: #fff;
    font-size: 1.3em;
    cursor: pointer;
    outline: none;
  }

  .doSubmit-btn:hover{
    background: #786450;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.3);
  }

  .data-picker {
    padding: 5px 8px;
    border: 1px solid #eee;
    border-radius: 5px;
    outline: none;
  }

  .modify-birth-div {
    text-align: left;
  }

  .other-link-item-side {
    padding: 0 20px;
  }

  .loading-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .loading-main {
    position: fixed;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
  }

  .notice-link {
    margin-left: 5px;
    color: #fff;
    font-size: 0.8em;
  }

  .modify-pwd-main {
    position: fixed;
    z-index: 90;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
  }

  .modify-pwd-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 400px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    outline: none;
    overflow-y: auto;
    border-radius: 10px;
    padding-bottom: 15px;
    max-height: 80%;
    padding: 0 10px 20px;
  }

  .modify-pwd-title-div {
    text-align: center;
    padding: 10px 0px;
    font-weight: 600;
    font-size: 1.25em;

  }

  .modify-pwd-op-div {
    padding: 5px 8px;
  }

  .modify-pwd-op-title {
    font-weight: 600;
  }

  .cancel-modify-pwd-btn {
    border: 1px solid #B18F6A;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 10px 15px;

    font-size: 16px;
    text-decoration: none;
    line-height: 1;
    transition: all 0.3s;
    background: transparent;
    font-weight: 500;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, STHeiti, WenQuanYi Micro Hei, Helvetica, Arial, sans-serif;
    letter-spacing: 2px;
    outline: none;
    transition: all 0.3s ease-in-out;
    margin-left: 5px;
    margin-right: 5px;
  }

  .cancel-modify-pwd-btn:hover {
    background: #9e9e9e;
    color: #fff;
  }

  .modify-pwd-op-btn-div {
    text-align: center;
    margin-top: 10px;
  }

  .do-modify-pwd-btn {
    border: 1px solid #B18F6A;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 10px 15px;

    font-size: 16px;
    text-decoration: none;
    line-height: 1;
    transition: all 0.3s;
    background: transparent;
    font-weight: 500;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, STHeiti, WenQuanYi Micro Hei, Helvetica, Arial, sans-serif;
    letter-spacing: 2px;
    outline: none;
    transition: all 0.3s ease-in-out;
    margin-left: 5px;
    margin-right: 5px;
  }

  .do-modify-pwd-btn:hover {
    background: #B18F6A;
    color: #fff;
  }
</style>

