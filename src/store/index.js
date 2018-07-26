import Vue from 'vue';
import Vuex from 'vuex';
import DBHandler from '../assets/js/dbHandler';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      dbHandler: new DBHandler()
    },
    mutations: {
      
    },
    actions: {

    }
})

export default store;