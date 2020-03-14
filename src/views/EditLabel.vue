<template>
    <Layout>
        <div class="navBar">
             <Icon class="leftIcon" name="right" @click.native="$router.go(-1)"/>
            <span class="title">编辑标签</span>
            <span/>
        </div>
        <div class="form-wrapper">
            <Notes :inputValue="tags.name" @update:input-value="updateTag" field-name="标签名" placeholder="请输入标签名" />
        </div>
        <div class="buttonWrapper">
            <Button @click.native="deleteTag">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">

    import  Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '@/models/tagListMode';
    import Notes from '@/components/Money/Notes.vue';
    import Button from '@/components/Button.vue';
    import any = jasmine.any;
    @Component({
        components: {Button, Notes}
    })
    export default class EditLabel extends Vue {
        tags?:{id:string,name:string} = undefined
        inputValue = ''
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch;
            const tags = tagListModel.data;
            const tag = tags.filter(tag =>tag.id === id)[0];
            if(tag){
                this.tags = tag
            }else {
                this.$router.replace('/404')
            }
        }
        updateTag(name:string){
            if(this.tags) {
                 tagListModel.update(this.tags.id,name);
            }
        }
        deleteTag(){
            if(this.tags){
                tagListModel.remove(this.tags.id);
                this.$router.push('/labels')
            }
        }
    }

</script>

<style lang="scss" scoped>
.navBar {
    font-size: 16px;
    padding:12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .title {

    }
    > .leftIcon {
        transform: rotate(180deg);
    }
}
    .form-wrapper {
        margin-top: 8px;
        background: white;
    }
    .buttonWrapper {
        text-align: center;
        padding:16px;
        margin-top: 28px;
    }
</style>
