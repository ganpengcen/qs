<template>
  <div class="footBar">
   © 2019 - 重庆库克科技(quickcq.com)
  </div>
</template>

<script>
    export default {
        name: "FootBar"
    }
</script>

<style scoped>
  .footBar{
    position: absolute;
    bottom: 0;
    border-top: 1px solid #e4eaec;;
    height: 39px;
    line-height: 40px;
    padding: 10px 40px;
    background: #f4f4f4;
    z-index: 3;
    text-align: left;
    width: calc(100% - 80px );
  }
</style>
