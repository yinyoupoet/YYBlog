<template>
    <div>
      <BaseCollectionDir :isSelf="false"></BaseCollectionDir>
    </div>
</template>

<script>
    import BaseCollectionDir from "../../components/bases/BaseCollectionDir";
    export default {
        name: "UserProfileOtherCollection",
        components: {BaseCollectionDir}
    }
</script>

<style scoped>

</style>
