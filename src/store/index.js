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
      playMode: playModes.SEQUENCE_LOOP,
      seekablebarWidth: 0,
      musicControls: null
    },
    mutations: {
      [mutationTypes.CREATE_AUDIO_PLAYER_REFERENCE] (state, payload) {
        state.audioPlayer = payload.audioPlayerReference;
        // console.log(payload.audioPlayerReference);
      },
      [mutationTypes.CREATE_MUSIC_CONTROLS_REFERENCE] (state, payload) {
        state.musicControls = payload.musicControlsReference;
      },
      [mutationTypes.SELECT_SONG] (state, payload) {
        state.previousSelection = state.selectedSong;
        state.selectedSong = payload.song;
      },
      [mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE] (state, payload) {
        // make current selection previous
        state.previousSelection = state.selectedSong;
        let nextSongIndex =-1, step = 0;

        if(payload.next)  step = 1;
        else if(payload.previous) step = -1
        // find nexSongIndex based on playMode
        switch(state.playMode) {
          case playModes.SEQUENCE_LOOP:
            nextSongIndex = (state.previousSelection.index + step + state.songs.length) % state.songs.length;
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