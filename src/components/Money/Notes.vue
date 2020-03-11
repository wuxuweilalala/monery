<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" v-model="inputValue" :placeholder="placeholder" >
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    inputValue:string  = '';
    // onChange(event:KeyboardEvent){
    //   const input = event.target as HTMLInputElement;
    //   console.log(input.value);
    //   this.inputValue = input.value;
    // }
    @Prop({required:true}) fieldName!:string;
    @Prop() placeholder!:string;
    @Watch('inputValue')
    onValueChange(value:string) {
      this.$emit('update:value',value)
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