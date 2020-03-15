import tagListModel from '@/models/tagListModel';

export default {
    tagList: tagListModel.fetch(),
    createTag: (name:string)=>{
        tagListModel.create(name)
    },
    removeTag: (id:string)=>{
        tagListModel.remove(id);
    },
    update: (id:string,name:string)=>{
        tagListModel.update(id,name);
    }
}