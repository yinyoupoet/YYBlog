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

  .block-div {
    margin: 15px 0;
  }
  .bc p{
    text-indent:2em;
    padding:0px;
    margin:0px;
  }

  .link-div {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px 20px;
    transition: all 0.3s ease-in-out;
    outline: none;
    text-decoration: none;
  }

  .link-div:hover {
    background: #fff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    text-decoration: none;
  }

  .link-a:hover {
    text-decoration: none;
  }

  .link-title {
    padding-top: 10px !important;
    text-indent: 0 !important;
    text-decoration: none;
    font-size: 1.25em;
    color: #000;
  }

  .link-description-p {
    text-indent: 0 !important;
    font-weight: 400;
    margin-top: 10px !important;
    font-size: 15px;
    line-height: 1.55em;
    color: #000;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    letter-spacing: 2px;
  }

  .link-bottom-bar {
    margin-top: 10px !important;
    color: #999;
  }

  .header-h {
    font-weight: 600;
  }

  .link-img {
    margin: auto;
    margin-top: 10px;
    margin-bottom: -10px;

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 65px !important;
    height: 65px !important;
    border-radius: 3px;
  }

  .blog-img {
    max-width: 100%;
    margin: 5px auto;
    display: block;
    border-radius: 5px;

  }

  .img-border {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 15px;
  }

  .img-caption {
    color: #666;
    font-size: 14px;
    text-align: center;
  }

  .img-stretched {
    width: 100% !important;
  }

  .img-div-with-background {
    padding: 5px;
    border-radius: 15px;
    background: #ddd;
  }

  .img-div {
    margin-top: 20px;
    transition: all 0.3s ease-in-out;
    padding: 5px;
    border-radius: 10px;
  }

  .img-div:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

</style>
