import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
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
        if(i.name === name ){return}
      }
      const id = createId().toString();
      state.tagList.push({id,name});
      store.commit('saveTag');
    },
    updateTags(state,id:string, name:string){
      const idList = state.tagList.map(item => item.id);
      if(idList.indexOf(id) >= 0){
        const names = state.tagList.map(item=>item.name);
        if(names.indexOf(name) >=0){
          return 'duplicated'
        }else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTag')
          return 'success'
        }
      }else {
        return 'not found'
      }
    },
    removeTag(state,id:string){
      state.tagList.forEach((item,index)=>{
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