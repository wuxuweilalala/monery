<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <Types  :type.sync="record.type"/>
    <div class="noteWrapper">
      <Notes field-name="备注"  placeholder="在这里输入备注"  @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" />
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

const recordList =  recordListModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue{
  tags = window.tagList;
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
  saveRecord(){
    recordListModel.create(this.record);
  }
  @Watch('recordList')
  onRecordListChange(){
    recordListModel.save();
  }
  @Watch('tags')
  onTagsChange(){
    window.createTag(this.tags[this.tags.length-1].name)
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
