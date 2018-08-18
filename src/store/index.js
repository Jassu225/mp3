import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import {mutationTypes, actionTypes} from '../assets/js/constants';
import APIHandler from './APIHandler';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      songs: [],
    },
    mutations: {
      [mutationTypes.GET_TOP_TRACKS] (state) {
        
      }
    },
    actions: {
      async [actionTypes.GET_SONGS_FROM_SERVER] ({state}) {
        let data = await APIHandler.getSongs();
        console.log(data);
        state.songs = data.songs;
      },
      async [actionTypes.GET_SONGS] ({ commit, state, dispatch }) {
        await dispatch(actionTypes.GET_SONGS_FROM_SERVER)
      }
    }
})

export default store;