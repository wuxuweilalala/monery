import createId from '@/lib/createId';

type Tag = {
    id:string;
    name:string;
}
type tagListModel = {
    data:Tag[]
    fetch:()=>Tag[]
    update:(id:string,name:string)=>'success' | 'not found' | 'duplicated'
    create:(name:string)=>boolean
    remove:(id:string) => boolean
    save:()=>void
}

// @ts-ignore
// @ts-ignore
const tagListModel:tagListModel = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('tagListModel' )|| '[]') ;
        return this.data
    },
    update(id,name){
        const idList = this.data.map(item => item.id);
        if(idList.indexOf(id) >= 0){
            const names = this.data.map(item=>item.name);
            if(names.indexOf(name) >=0){
                return 'duplicated'
            }else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;
                this.save();
                return 'success'
            }
        }else {
            return 'not found'
        }
    },
    create(name:string){
        for(let i of this.data) {
            if(i.name === name ){return false}
        }
        const id = createId().toString();
        this.data.push({id,name});
        this.save();
        return true
    },
    remove(id){
        this.data.forEach((item,index)=>{
            if(item.id === id) {
                this.data.splice(index,1);
                this.save();
            }
        });
        return true
    },
    save(){
        window.localStorage.setItem('tagListModel',JSON.stringify(this.data));
    }
}


export default tagListModel;
