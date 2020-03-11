type Tag = {
    id:string;
    name:string;
}
type tagListModel = {
    data:Tag[]
    fetch:()=>Tag[]
    create:(name:string)=>boolean
    save:()=>void
}

const tagListModel:tagListModel = {
    data:[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('tagListModel' )|| '[]') ;
        return this.data
    },
    create(name:string){
        for(let i of this.data) {
            if(i.name === name ){return false}
        }
        this.data.push({id:name,name});
        this.save();
        return true
    },
    save(){
        window.localStorage.setItem('tagListModel',JSON.stringify(this.data));
    }
}


export default tagListModel;