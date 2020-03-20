import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

type RootState = {
  recordList:RecordItem[],
  tagList: [],
  currentTag?:undefined
}

const store =  new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList: [] as Tag[],
    currentTag:undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id:string){
      // @ts-ignore
      const tag = state.tagList.filter(t=>t.id === id)[0]
      state.currentTag = tag;
    },
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList' )|| '[]') as RecordItem[];
    },
    createRecord(state,record:RecordItem){
      const deepClone:RecordItem =  clone(record) ;
      deepClone.createdAt = new Date();
      state.recordList.push(deepClone);
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagListModel') || '[]' )
    },
    createTag(state,name:string){
      for(let i of state.tagList) {
        // @ts-ignore
        if(i.name === name ){return}
      }
      const id = createId().toString();
      // @ts-ignore
      state.tagList.push({id,name});
      store.commit('saveTag');
    },
    updateTags(state,payload:{id:string, name:string}){
      const {id,name} = payload;
      // @ts-ignore
      const idList = state.tagList.map(item => item.id);
      if(idList.indexOf(id) >= 0){
        // @ts-ignore
        const names = state.tagList.map(item=>item.name);
        if(names.indexOf(name) >=0){
          window.alert('标签名重复了')
        }else {
          // @ts-ignore
          const tag = state.tagList.filter(item => item.id === id)[0];
          // @ts-ignore
          tag.name = name;
          store.commit('saveTag')
        }
      }
    },
    removeTag(state,id:string){
      state.tagList.forEach((item,index)=>{
        // @ts-ignore
        if(item.id === id) {
          state.tagList.splice(index,1);
          store.commit('saveTag');
        }
      });
      return true
    },
    saveTag(state){
      window.localStorage.setItem('tagListModel',JSON.stringify(state.tagList));
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store