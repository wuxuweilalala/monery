import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false

Vue.component('Layout', Layout)
Vue.component('Icon', Icon);


// recordList store
window.recordList = recordListModel.fetch();
window.createRocord = (record:RecordItem)=>{
  recordListModel.create(record);
}

// tagList store
window.tagList = tagListModel.fetch();
window.createTag = (name:string)=>{
  tagListModel.create(name)
};
window.removeTag = (id:string)=>{
  tagListModel.remove(id);
};
window.update = (id:string,name:string)=>{
  tagListModel.update(id,name);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
