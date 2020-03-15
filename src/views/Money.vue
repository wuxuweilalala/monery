<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <Types  :type.sync="record.type"/>
    <div class="noteWrapper">
      <Notes field-name="备注"  placeholder="在这里输入备注"  :input-value.sync="record.notes"/>
    </div>
    <Tags :data-source.sync="tags" :value.sync="record.tags" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
  import {Component,Watch} from 'vue-property-decorator';
  import store from '@/store/index2';

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue{
  tags = store.tagList;
  recordList = store.recordList;
  record: RecordItem = {tags:[],notes:'',type:'-',amount:0}
  saveRecord(){
    store.createRecord(this.record);
  }
  @Watch('tags')
  onTagsChange(){
    console.log(this.tags[this.tags.length - 1].name);
    store.createTag(this.tags[this.tags.length-1].name)
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
