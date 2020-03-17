import clone from '@/lib/clone';
let data:RecordItem[] | undefined = undefined;

const recordStore = {
    recordList:[] as RecordItem[],
    fetchRecords(){
        this.recordList = JSON.parse(window.localStorage.getItem('recordList' )|| '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecords(){
        window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
    },
    createRecord(record:RecordItem){
        const deepClone:RecordItem =  clone(record) ;
        deepClone.createdAt = new Date();
        this.recordList && this.recordList.push(deepClone);
        recordStore.saveRecords();
    }
};
recordStore.fetchRecords();
export default recordStore;
