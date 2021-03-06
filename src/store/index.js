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
      // Below prop has been removed and added to playlists
      // seemed unnecessary to declare here
      // playMode: playModes.LOOP_ALL,
      seekablebarWidth: 0,
      musicControls: null,
      audioVolumes: [0, 1],
      // must not change
      audioVolumesSelector: 1
    },
    mutations: {
      // to toggle side-navbar
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
        // make current selection as previous selection
        state.previousSelection = state.selectedSong;
        // make new selection as current selection
        state.selectedSong = payload.song;
        // update playlist's selected song index 
        // in the selected playlist based on playMode
        playlists.selectNewSong(payload.song);
      },
      //  Music Controls' actions
      // -------------------------------------------------------------------
      [mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE] (state, payload) {
        // make current selection previous
        state.previousSelection = state.selectedSong;

        let SongIndex = null;

        // get next song index from playlists
        if(payload.next)  SongIndex = playlists.getNextSongIndex(payload.autoplay);
        else if(payload.previous) SongIndex = playlists.getPreviousSongIndex(payload.autoplay);

        // if SongIndex is null, stop player
        if(SongIndex == null) return;
        // make new Selection
        state.selectedSong = state.songs[SongIndex];
        // load Audio player with new selection source
        state.selectedSong.VueReference.LoadAudio();
        // play new Song
        state.selectedSong.VueReference.playPauseSong();
      },
      [mutationTypes.TOGGLE_SHUFFLE] (state) {
        playlists.toggleShuffle();
      },
      // ----------------------------------------------------------------------------------
      [mutationTypes.SET_PLAY_MODE] (state, payload) {
        if(payload.playMode == playModes.REPEAT_ONE) state.audioPlayer.loop = true;
        else {
          state.audioPlayer.loop = false;
          playlists.setPlayMode(payload.playMode);
        }
      },
      // Song Actions
      // ---------------------------------------------------------------
      [mutationTypes.PLAY_NEXT] (state, payload) {
        
      },
      // -----------------------------------------------------------------
      // key controls
      [mutationTypes.MUTE_AUDIO] (state) {
        // store current volume
        state.audioVolumes[state.audioVolumesSelector] = state.audioPlayer.volume;
        // increment selector
        state.audioVolumesSelector = (state.audioVolumesSelector + 1) % state.audioVolumes.length;
        // mute / unmute
        state.audioPlayer.volume = state.audioVolumes[state.audioVolumesSelector];
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