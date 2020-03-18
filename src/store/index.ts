import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
  },
  mutations: {
    createRecord(state,record:RecordItem){
      const deepClone:RecordItem =  clone(record) ;
      deepClone.createdAt = new Date();
      state.recordList.push(deepClone);
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store