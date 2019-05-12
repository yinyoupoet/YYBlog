<template>
  <div>
    <BaseTopBar class="top-bar"></BaseTopBar>
    <div class="index-div">
      <!--最上方的轮播图-->
      <div class="carousel slide" id="myCarousel">
        <!--轮播（Carousel）指标-->
        <ol class="carousel-indicators" >
          <li data-target="#myCarousel" data-slide-to="0" class="active">1</li>
          <li data-target="#myCarousel" data-slide-to="1">2</li>
          <li data-target="#myCarousel" data-slide-to="2">3</li>
        </ol>
        <!--轮播项目-->
        <div class="carousel-inner" >
          <div class="item active">
            <img src="/static/test/2.jpg" alt="First slide" class="index-recommend-img">
            <div class="carousel-caption">标题1</div>
          </div>
          <div class="item">
            <img src="/static/test/3.jpg" align="Second slide" class="index-recommend-img">
            <div class="carousel-caption">标题2</div>
          </div>
          <div class="item">
            <img src="/static/test/6.jpg" alt="Third slide" class="index-recommend-img">
            <div class="carousel-caption">标题3</div>
          </div>
        </div>

        <!--轮播导航-->
        <a class="carousel-control left" href="#myCarousel" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control right" href="#myCarousel" role="button" data-slide="next" data-interval="5000">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>


      <!--下方一大部分-->
      <div class="index-main-content">
        <div class="big-categories-div ">
          <span class="big-category-item-span" v-for="item in bigCategoryList" :key="item.bigCategoryId" :class="item.bigCategoryId == thisCategoryId?'big-category-item-span-active':''">
            {{item.bigCategoryName}}
          </span>
        </div>


        <div class="container-fluid">
          <IndexCategory></IndexCategory>
        </div>


      </div>


    </div>

    <div class="container">
      <BaseBottomBar></BaseBottomBar>
    </div>
  </div>
</template>

<script>
  import BaseTopBar from "../components/bases/BaseTopBar";
  import BaseBottomBar from "../components/bases/BaseBottomBar";
  import IndexCategory from "./index/IndexCategory";
  export default {
    name: "Index",
    components: {IndexCategory, BaseBottomBar, BaseTopBar},
    data: function() {
      return {
        bigCategoryList: [{
          bigCategoryName: '文化',
          bigCategoryId: 0
        },{
          bigCategoryName: '娱乐',
          bigCategoryId: 1
        },{
          bigCategoryName: '时评·军事',
          bigCategoryId: 2
        },{
          bigCategoryName: '体育',
          bigCategoryId: 3
        },{
          bigCategoryName: '财经',
          bigCategoryId: 4
        },{
          bigCategoryName: '股票',
          bigCategoryId: 5
        },{
          bigCategoryName: 'IT',
          bigCategoryId: 6
        }],
        thisCategoryId: 0
      }
    }

  }
</script>

<style scoped>

  .top-bar{
    position: fixed;
    z-index: 8;
  }

  #myCarousel{
    z-index: 5;
    padding-top: 56px;
  }


  .index-recommend-img {
    height: 600px !important;
    width: 100%;
    object-fit: cover;

  }
  .carousel-caption{
    margin-bottom: 120px;
    font-size: 2em;
    text-align: left;
    font-weight: 600;
    text-shadow: #000 0px 1px 1px, #000 -1px 0px 2px, #000 0 0 5px;
  }
  .carousel-indicators{
    margin-bottom: 100px;
    text-align: left;
  }


  .carousel-indicators li{
    width: 36px;
    height: 36px;
    text-indent: 0;
    line-height: 36px;
    text-align: center;
    border: 1px solid rgba(0,0,0,0);
    background: rgba(255,255,255,0.5);
    color: #000;
  }
  .carousel-indicators .active{
    background: #f1562a;
    color: #fff;
  }

  .index-main-content{
    position: relative;
    width: 100%;
  }

  .big-categories-div{
    margin-top: 25px;
    padding: 0 50px 20px;
    border-bottom: 1px solid #eee;
  }



  .index-main-content{

  }

  .big-category-item-span{
    display: inline-block;
    font-size: 1.2em;
    margin: 0px 5px;
    color: #888;
    cursor: pointer;
    padding: 8px 10px;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
  }

  .big-category-item-span-active{
    color: #fff;
    background: #f1562a;
    border-radius: 5px;
  }

  .big-category-item-span:hover{
    color: #f1562a;
  }


</style>
