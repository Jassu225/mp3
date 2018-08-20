import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import {mutationTypes, actionTypes, playModes} from '../assets/js/constants';
import APIHandler from './APIHandler';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      songs: [],
      audioPlayer: null,
      previousSelection: null,
      selectedSong: null,
      playMode: playModes.SEQUENCE
    },
    mutations: {
      [mutationTypes.CREATE_AUDIO_PLAYER_REFERENCE] (state, payload) {
        state.audioPlayer = payload.audioPlayerReference;
        // console.log(payload.audioPlayerReference);
      },
      [mutationTypes.SELECT_SONG] (state, payload) {
        state.previousSelection = state.selectedSong;
        state.selectedSong = payload.song;
      },
      [mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE] (state) {
        // make current selection previous
        state.previousSelection = state.selectedSong;
        let nextSongIndex =-1;
        // find nexSongIndex based on playMode
        switch(state.playMode) {
          case playModes.SEQUENCE:
            nextSongIndex = (state.previousSelection.index + 1 ) % state.songs.length;
            // console.log(nextSongIndex);
            break;
        }
        // make new Selection
        state.selectedSong = state.songs[nextSongIndex];
        // load Audio player with new selection source
        state.selectedSong.VueReference.LoadAudio();
        // play new Song
        state.selectedSong.VueReference.playPauseSong();
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