import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import {mutationTypes} from '../assets/js/constants';
// import APIHandler from './httpRequest';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      topTracks: null,
    },
    mutations: {
      [mutationTypes.GET_TOP_TRACKS] (state) {
        
      }
    },
    actions: {

    }
})

export default store;