<template>
    <div>
      <div class="box">
        <div class="category-item item-blog" @click="()=>{this.$router.push('/user/' + this.userId)}" title="点击前往">
          <div class="category-item-title-div">
            我的博客
          </div>
          <div class="category-item-content-div row">
            <div class="category-item-content col-xs-6">
              <span title="阅读量" class="item-span"><i class="fa fa-eye" aria-hidden="true"></i> 100000000</span>
            </div>
            <div class="category-item-content col-xs-6" >
              <span title="评论数" class="item-span"><i class="fa fa-commenting" aria-hidden="true"></i> 200</span>
            </div>
            <div class="category-item-content col-xs-6" >
              <span title="喜欢数" class="item-span"><i class="fa fa-heart" aria-hidden="true"></i> 200</span>
            </div>
            <div class="category-item-content col-xs-6" >
              <span title="文章数" class="item-span"><i class="fa fa-list" aria-hidden="true"></i> 200</span>
            </div>
          </div>
        </div>
        <div class="category-item">
          <div class="category-item-title-div">
            我的收藏夹（{{collectListNum}}）
          </div>
          <div class="category-item-collect-div">
            <button class="category-item-btn" @click="()=>{this.$router.push('/userProfile/' + this.userId + '/collection/myDir')}">点击查看</button>
          </div>
        </div>
        <div class="category-item">
          <div class="category-item-title-div">
            我的关注（{{followingNum}}）
          </div>
          <div class="category-item-collect-div">
            <button class="category-item-btn"  @click="()=>{this.$router.push('/userProfile/'+ this.userId + '/follow/myFollower')}">点击查看</button>
          </div>
        </div>
        <div class="category-item">
          <div class="category-item-title-div">
            我的粉丝（{{fansNum}}）
          </div>
          <div class="category-item-collect-div">
            <button class="category-item-btn"  @click="()=>{this.$router.push('/userProfile/'+ this.userId + '/follow/myFans')}">点击查看</button>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "UserProfileCategories",
        data: function() {
          return {
            userId: 1,
            collectListNum: 4,
            followingNum: 5,
            fansNum: 44
          }
        }
    }
</script>

<style scoped>
  .box{
    display: -webkit-flex;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }

  .category-item{
    flex-grow: 0;
    border: 3px solid #f1562a;
    border-radius: 10px;
    flex-shrink: 0;
    width: 250px;
    margin: 15px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    color: #f1562a;
  }

  .item-blog:hover{
    background: #f1562a;
    color: #fff;
  }
  .category-item-title-div{
    text-align: center;
    font-weight: 600;

  }
.category-item-content{
  padding: 5px;
  padding-left: 20px;
}


  .item-blog {

    cursor: pointer;
  }

  .item-span{
    transition: text-shadow 0.3s ease-in-out;
  }
  .item-span:hover{
    text-shadow: 5px 5px 15px rgba(255,255,255,0.9);
  }

  .category-item-collect-div{
    text-align: center;
    margin-top: 10px;
  }

  .category-item-btn{
    padding: 5px 20px;
    outline: none;
    border: 2px solid #f1562a;
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #f1562a;
    border-radius: 20px;
    font-weight: 900;
  }
  .category-item-btn:hover{
    background: #f1562a;
    color: #fff;
  }

</style>
