type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number,
    createdAt?:Date
}

interface Window {
    tagList: Tag[];
    createTag:(name:string) => void;
    removeTag:(id:string)=> void;
    update:(id:string,name:string)=>void;
    recordList: RecordItem[];
    createRecord:(record:RecordItem)=> void;
}
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