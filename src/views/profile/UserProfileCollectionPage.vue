<template>
    <div>
      <div class="collection-option-div">
        <span class="goto-left-span" @click="goback()"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>
        <router-link to="myDir" class="collection-link">我的收藏夹</router-link>
        <router-link to="otherDir" class="collection-link">我关注的收藏夹</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
      <BaseLive2d></BaseLive2d>
    </div>
</template>

<script>
    import BaseLive2d from "../../components/bases/BaseLive2d";
    export default {
        name: "UserProfileCollectionPage",
      components: {BaseLive2d},
      methods: {
          goback: function () {
            this.$router.push('/userProfile/' + this.userId)
          }
      },
      data: function () {
        return {
          userId: 1
        }
      }
    }
</script>

<style scoped>
  .collection-option-div{
    margin-top: 20px;
  }

  .goto-left-span{
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease-in-out;
    font-size: 1.5em;
    font-weight: 400;
    margin-right: 30px;
    border: 2px solid #fff;
    border-radius: 6px;
    padding: 3px 8px;
  }
  .goto-left-span:hover{
    color: #f1562a;
    border: 2px solid #f1562a;
  }

  .collection-link{
    padding: 5px 10px;
    border-radius: 3px;
    text-align: center;
    text-decoration: none;
    color: #000;
    font-weight: 800;
    transition: all 0.3s ease-in-out;
  }

  .collection-link:hover{
    text-decoration: none;
    color: #fff;
    background: #e65100;
  }

  .router-link-exact-active{
    text-decoration: none;
    color: #fff;
    background: #f1562a;
  }

</style>
