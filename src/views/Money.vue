<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <Types  :type.sync="record.type"/>
    <div class="noteWrapper">
      <Notes field-name="备注"  placeholder="在这里输入备注"  @update:value="onUpdateNotes"/>
    </div>
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
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListMode';

const recordList =  recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue{
  tags = tagListModel.fetch();
  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags:[],notes:'',type:'-',amount:0}
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
    const deepClone:RecordItem =  recordListModel.clone(this.record) ;
    deepClone.createdAt = new Date();
    this.recordList.push(deepClone)
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
  .noteWrapper {
    padding:12px 0;
  }
</style>