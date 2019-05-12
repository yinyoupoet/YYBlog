<template>
    <div>
      <BaseTopBar></BaseTopBar>
      <div class="container user-profile-main-div">
        <div class="profile-head-div">
          <img :src="userAvatarUrl" class="profile-img">
          <p class="profile-head-user-name">{{userName}}</p>
          <p class="profile-head-user-motto">{{userMotto}}</p>
        </div>

        <div>
          <router-view></router-view>
        </div>

      </div>

      <BaseLive2d></BaseLive2d>
      <div class="container">
        <BaseBottomBar></BaseBottomBar>
      </div>
    </div>
</template>

<script>
    import BaseTopBar from "../../components/bases/BaseTopBar";
    import BaseLive2d from "../../components/bases/BaseLive2d";
    import BaseBottomBar from "../../components/bases/BaseBottomBar";
    import UserProfileCategories from "../profile/UserProfileCategories";
    export default {
      name: "UserProfile",
      components: {UserProfileCategories, BaseBottomBar, BaseLive2d, BaseTopBar},
      data: function() {
        return {
          userId: '11',
          userAvatarUrl: '/static/head/10.jpg',
          userName: 'kk',
          userMotto: '致虚极，守静笃'
        }
      }
    }
</script>

<style scoped>
  .profile-head-div {
    text-align: center;
    margin-top: 20px;
  }

  .profile-img {
    width: 96px;
    height: 96px;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.3);
    border-radius: 50%;
  }

  .profile-head-user-name{
    margin-top: 8px;
    font-weight: 600;
    margin-bottom: 0;
  }

  .profile-head-user-motto{
    margin-top: 4px;
    color: #666;
  }
</style>
