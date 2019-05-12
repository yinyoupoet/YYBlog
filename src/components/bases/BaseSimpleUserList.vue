<template>
    <div>
      <div class="box">
        <div class="user-item" v-for="user in userList" :key="user.userId">
          <img :src="user.userAratarUrl" class="user-list-avatar-img" @click="gotoUser(user.userId)">
          <p class="user-name-p"><router-link :to="'/user/' + user.userId" class="user-link">{{user.userName}}</router-link></p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseSimpleUserList",
        data: function() {
          return {
            userList: [{
              userId: 1,
              userName: 'kk',
              userAratarUrl: '/static/head/12.jpg'
            },{
              userId: 2,
              userName: '谷物',
              userAratarUrl: '/static/head/12.jpg'
            }]
          }
        },
      methods: {
          gotoUser: function(userId) {
            this.$router.push('/user/' + userId)
          }
      }
    }
</script>

<style scoped>
  .box{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;

  }

  .user-item{
    flex-shrink: 0;
    width: 128px;
    text-align: center;
    padding: 15px 15px 0;
  }

  .user-list-avatar-img {
    border-radius: 8px;
    width: 96px;
    height: 96px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .user-name-p {
    font-weight: 600;
  }
  .user-link{
    color: #000;
    transition: all 0.5s ease-in-out;
    text-decoration: none;
  }

  .user-link:hover{
    color: #f1562a;
  }

</style>
