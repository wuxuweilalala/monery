import clone from '@/lib/clone';

const recordListModel = {
    data:[] as RecordItem[],
     create(record:RecordItem){
         const deepClone:RecordItem =  clone(record) ;
         deepClone.createdAt = new Date();
         this.data.push(deepClone)
     },
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('recordList' )|| '[]') as RecordItem[]
        return  this.data;
    },
     save(){
         window.localStorage.setItem('recordList',JSON.stringify(this.data));
     }
 }


 export default recordListModel;