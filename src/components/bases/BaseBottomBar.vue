<template>
    <div>
      <hr class="bottom-position-hr">
      <hr class="bottom-split-line">
      <div class="bottom-text-div">

        <img src="../../assets/logo1.png" class="bottom-logo"/>
        <p>Copyright © 2019 YinyouPoet</p>
      </div>

    </div>
</template>

<script>
    export default {
        name: "BaseBottomBar"
    }
</script>

<style scoped>
  /* 无法将hr直接设置margin-top(设置无效)，所以用这个hr的margin来调整位置 */
  .bottom-position-hr {
    width: 100%;
    opacity: 0;
  }

  .bottom-split-line{
    margin: 80px 0 20px;
  }

  .bottom-text-div{
    text-align: center;
    padding-bottom: 20px;
    color: #777;
  }

  .bottom-logo{
    height: 5em;
  }
</style>
