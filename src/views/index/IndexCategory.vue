<template>
    <div>
      <div class="row">
        <div class="col-xs-8 index-category-left-div">
          <BaseIndexBlogList></BaseIndexBlogList>
        </div>
        <div class="col-xs-4 index-category-right-div">
          <div class="write-div">
            <button class="write-btn">写博客</button>
          </div>
          <div class="people-div">
            <div class="people-div-title">
              <span class="people-title">推荐用户</span>
              <span class="people-refresh"><i class="fa fa-refresh" aria-hidden="true"></i></span>
            </div>
            <div class="recommend-user-list">
              <div class="recomment-user-item" v-for="user in recommentUserList">
                <img :src="user.userAvatarUrl" class="user-avatar">
                <span class="user-name-span">{{user.userName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

    import BaseIndexBlogList from "../../components/bases/BaseIndexBlogList";
    export default {
        name: "IndexCategory",
      components: {BaseIndexBlogList},
      data: function() {
          return {
            recommentUserList: [{
              usrId: 1,
              userName: 'kk',
              userAvatarUrl: '/static/head/1.jpg'
            },{
              usrId: 2,
              userName: 'kk',
              userAvatarUrl: '/static/head/1.jpg'
            },{
              usrId: 3,
              userName: 'kk',
              userAvatarUrl: '/static/head/1.jpg'
            },{
              usrId: 4,
              userName: 'kk',
              userAvatarUrl: '/static/head/1.jpg'
            },{
              usrId: 5,
              userName: 'kk',
              userAvatarUrl: '/static/head/1.jpg'
            }]
          }
      }

    }
</script>

<style scoped>
  .index-category-left-div{
    padding: 40px 50px;
  }

  .index-category-right-div{
    padding: 40px 50px;
  }

  .right-div{
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
  }
  .write-div{
    text-align: center;
    padding: 20px 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .write-btn{
    text-align: center;
    width: 100%;
    padding: 20px 0;
    background: transparent;
    border-radius: 10px;
    border: 3px solid #B18F6A;
    outline: none;
    color: #f1562a;
    font-size: 1.2em;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
  }

  .write-btn:hover{
    background: #C8C8A9;
    box-shadow: 0px 0px 5px #666 inset;
    color: #555;
  }

  .people-title{
    font-size: 1.2em;
    font-weight: 600;
    color: #000;
  }

  .people-div{
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px 0;
    background: #fff;
    margin-top: 30px;
  }
  .people-div-title{
    padding: 0 20px;
  }

  .people-refresh{
    float: right;
    cursor: pointer;
  }

  .recommend-user-list{
    margin-top: 15px;
    background: #fff;

  }

  .recomment-user-item{
    padding: 8px 20px;
    margin-bottom: 4px;
    cursor: pointer;
  }

  .recomment-user-item:hover {
    background: rgba(188,188,188,0.3);
  }


  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .user-name-span{
    margin-left: 20px;
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
