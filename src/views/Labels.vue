<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id" @click="toEditLabel(tag)"> <span>{{tag.name}}</span>
        <Icon name="right"/> </li>
    </ol>
    <div class="createTagWrapper">
      <Button  @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';
  @Component({
    components: {Button}
  })
  export  default class Labels extends Vue {
    tags = store.tagList;

    createTag(){
          const name = window.prompt('请输出标签名')
          name && store.createTag(name)
    }
  toEditLabel(tag:{id:string,name:string}){
    this.$router.push(`/labels/edit/${tag.id}`)
  }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    > li {
      min-height: 44px;
      display: flex;
      align-items:center;
      justify-content: space-between;
      padding-left: 16px;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color:#666;
        margin-right: 16px;
      }
    }
  }
  .createTagWrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

  }

</style>
