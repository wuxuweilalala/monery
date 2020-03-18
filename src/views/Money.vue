<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <Types  :type.sync="record.type"/>
    <div class="noteWrapper">
      <Notes field-name="备注"  placeholder="在这里输入备注"  :input-value.sync="record.notes"/>
    </div>
    <Tags :value.sync="record.tags" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
  import {Component} from 'vue-property-decorator';

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue{
  record: RecordItem = {tags:[],notes:'',type:'-',amount:0}
  saveRecord(){
    this.$store.commit('createRecord',this.record);
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
