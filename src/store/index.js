import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import {mutationTypes, actionTypes} from '../assets/js/constants';
import APIHandler from './APIHandler';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      songs: [],
      audioPlayer: new Audio()
    },
    mutations: {
      [mutationTypes.GET_TOP_TRACKS] (state) {
        
      }
    },
    actions: {
      async [actionTypes.GET_SONGS_FROM_SERVER] ({state}) {
        let data = await APIHandler.getSongs();
        // console.log(data);
        state.songs = JSON.parse(data).songs;
        // console.log(data.songs[0].album);
      },
      async [actionTypes.GET_SONGS] ({ commit, state, dispatch }) {
        await dispatch(actionTypes.GET_SONGS_FROM_SERVER)
      }
    }
})

export default store;