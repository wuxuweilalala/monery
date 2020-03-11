
type tagListModel = {
    data:string[]
    fetch:()=>string[]
    create:(name:string)=>boolean
    save:()=>void
}

const tagListModel:tagListModel = {
    data:['衣','食','住','行',],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('tagListModel' )|| '[]') ;
        return this.data
    },
    create(name:string){
        if(this.data.indexOf(name) >=0){return false}
        this.data.push(name);
        this.save();
        return true
    },
    save(){
        window.localStorage.setItem('tagListModel',JSON.stringify(this.data));
    }
}


export default tagListModel;