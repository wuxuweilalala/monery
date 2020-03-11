<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
  import Nav from './Nav.vue'
export default {
  props: ["classPrefix"],
  name: "Layout",
  components:{
    Nav
  }
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>