<template>
    <div>
      <router-view></router-view>


      <BaseLive2d></BaseLive2d>

    </div>
</template>

<script>
    import BaseLive2d from "../../components/bases/BaseLive2d";
    export default {
        name: "BlogPage",
      components: {BaseLive2d}
    }
</script>

<style scoped>

</style>
