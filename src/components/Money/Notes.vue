<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" :value="inputValue" @input="onValueChange($event.target.value)" :placeholder="placeholder" >
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop({default:""}) readonly inputValue!:string ;
    @Prop({required:true}) fieldName!:string;
    @Prop() placeholder!:string;
    onValueChange(value:string) {
      this.$emit('update:input-value',value)
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
