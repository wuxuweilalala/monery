import createId from '@/lib/createId';

const tagStore =  {
    tagList: [] as Tag[],
    fetchTags(){
        this.tagList = JSON.parse(window.localStorage.getItem('tagListModel') || '[]' )
        return this.tagList
    },
    createTag(name:string){
        for(let i of this.tagList) {
            if(i.name === name ){return false}
        }
        const id = createId().toString();
        this.tagList.push({id,name});
        this.saveTag();
        return true
    },
    removeTag(id:string){
        this.tagList.forEach((item,index)=>{
            if(item.id === id) {
                this.tagList.splice(index,1);
                this.saveTag();
            }
        });
        return true
    },
    updateTags(id:string, name:string){
        const idList = this.tagList.map(item => item.id);
        if(idList.indexOf(id) >= 0){
            const names = this.tagList.map(item=>item.name);
            if(names.indexOf(name) >=0){
                return 'duplicated'
            }else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTag();
                return 'success'
            }
        }else {
            return 'not found'
        }
    },
    saveTag(){
        window.localStorage.setItem('tagListModel',JSON.stringify(this.tagList));
    }

}

tagStore.fetchTags();

export default tagStore