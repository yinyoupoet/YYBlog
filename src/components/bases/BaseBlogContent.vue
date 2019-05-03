<template>
    <div>
      <div class="bc">
        <div v-html="blogContent">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BaseBlogContent",
        props: ["blogContent"]
    }
</script>

<style>
  .bc p{
    text-indent:2em;
    padding:0px;
    margin:0px;
  }

  .bc img{
    width: 100%;
  }
</style>
