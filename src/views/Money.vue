<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <Types  :type.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
  import {Component,Watch} from 'vue-property-decorator';

  type Record = {
    tags:string[]
    notes:string
    type:string
    amount:number
  }

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue{
  tags = ['衣','食','住','行']
  recordList: Record[] = [];
  record: Record = {tags:[],notes:'',type:'-',amount:0}
  onUpdateAmount(value:string){
   this.record.amount = parseFloat(value);
  }
  onUpdateType(value:string){
    this.record.type = value;
    console.log(value);

  }
  onUpdateNotes(value:string){
    this.record.notes = value;

  }
  onUpdateTags(value:string[]){
    this.record.tags = value;
  }
  saveRecord(){
    const deepClone = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(deepClone)
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>