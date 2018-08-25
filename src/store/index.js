import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import {mutationTypes, actionTypes, playModes} from '../assets/js/constants';
import APIHandler from './APIHandler';
// play sequences based on playModes
import playlists from './playlists';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      // To show and hide side-navbar
      sideNavbar: false,
      // To switch between tabs
      tab: null,
      //  To check if tabs are shown on screen
      Tabs: true,
      // ---------------
      songs: [],
      audioPlayer: null,
      previousSelection: null,
      selectedSong: null,
      playMode: playModes.LOOP_ALL,
      seekablebarWidth: 0,
      musicControls: null
    },
    mutations: {
      // to toggle side0navbar
      [mutationTypes.TOGGLE_SIDENAV] (state,payload) {
        state.sideNavbar = payload.newValue;
      },
      // to switch between tabs
      [mutationTypes.SWITCH_TABS] (state, payload) {
        state.tab = payload.newValue;
      },
      // to change visibility of tabs
      [mutationTypes.CHANGE_TABS_VISIBILITY] (state, payload) {
        state.Tabs = payload.newValue;
      },
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

        let SongIndex = null, calleFunction = null;

        if(payload.next)  calleFunction = 'nextIndex';
        else if(payload.previous) calleFunction = 'previousIndex';
        // find nexSongIndex based on playMode
        switch(state.playMode) {
          case playModes.LOOP_ALL:
            SongIndex = playlists.sequenceLoopPlaylist[calleFunction](state.selectedSong._id, payload.autoplay);
            // console.log(nextSongIndex);
            break;
          case playModes.ONCE_ALL:
            SongIndex = playlists.sequenceLoopPlaylist[calleFunction](state.selectedSong._id, payload.autoplay);
            break;
        }
        // if SongIndex is null, stop player
        if(SongIndex == null) return;
        // make new Selection
        state.selectedSong = state.songs[SongIndex];
        // load Audio player with new selection source
        state.selectedSong.VueReference.LoadAudio();
        // play new Song
        state.selectedSong.VueReference.playPauseSong();
      },
      [mutationTypes.SET_PLAY_MODE] (state, payload) {
        state.playMode = payload.playMode;
        // set play mode 
        switch(state.playMode) {
          case playModes.LOOP_ALL:
            playlists.sequenceLoopPlaylist.loopAll();
            break;
          case playModes.ONCE_ALL:
            playlists.sequenceLoopPlaylist.onceAll();
            break;
        }
      }
    },
    actions: {
      async [actionTypes.GET_SONGS_FROM_SERVER] ({state}) {
        let data = await APIHandler.getSongs();
        // console.log(data);
        state.songs = JSON.parse(data).songs;
        playlists.init(state.songs);
        // console.log(data.songs[0].album);
      },
      async [actionTypes.GET_SONGS] ({ commit, state, dispatch }) {
        await dispatch(actionTypes.GET_SONGS_FROM_SERVER)
      }
    }
})

export default store;