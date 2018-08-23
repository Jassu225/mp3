<template>
  <v-app>
    <div class="root-grid grid full-height">
      <navbar :config="config"></navbar>
      <tab-content :config="config"></tab-content>
      <audio 
        ref="audioPlayer" 
        class="hidden"
        @loadeddata="setDuration"
        @ended="audioEnded"
        @pause="audioPaused"
        @play="audioPlaying"
        @timeupdate="updateSeekbarWidthAndTime"
      ></audio>
      <music-controls 
        :seekablebarWidth="seekablebarWidth"
        :updateAudioTime="updateAudioTime"
        :currentTime="currentTime"
        :duration="duration"
      ></music-controls>
    </div>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';
import tabContent from './components/tabContent.vue';
import musicControls from './components/musicControls.vue';
import {actionTypes, mutationTypes} from './assets/js/constants';
import config from './config';

export default {
  components: {
    navbar, musicControls, tabContent
  },
  data () {
    return {
      config,
      seekablebarWidth: 0,
      currentTime: 0,
      duration: 0
    }
  },
  computed: {
    
  },
  mounted: function() {
    this.$store.dispatch(actionTypes.GET_SONGS);
    this.$store.commit(mutationTypes.CREATE_AUDIO_PLAYER_REFERENCE, {
      audioPlayerReference: this.$refs.audioPlayer
    });
  },
  methods: {
    audioEnded() {
      // for setting play icon in song-block
      this.$store.state.selectedSong.VueReference.AudioEnded();

      // set play icon in music-controls
      this.$store.state.musicControls.setPlayIcon();

      // select next song based on playMode
      this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE, {
        next: true,
        previous: false
      });
    },
    audioPaused() {
      if(!this.$refs.audioPlayer.ended) {
        // for setting play icon in song-block 
        this.$store.state.selectedSong.VueReference.AudioPaused();

        // set play icon in music-controls
        this.$store.state.musicControls.setPlayIcon();
      }
    },
    audioPlaying() {
      this.$store.state.selectedSong.VueReference.AudioPlaying();

      // set play icon in music-controls
      this.$store.state.musicControls.setPauseIcon();
    },
    updateSeekbarWidthAndTime() {
      let audio = this.$store.state.audioPlayer;
      this.seekablebarWidth = audio.currentTime / audio.duration * 100;
      // update current time
      this.currentTime = audio.currentTime;
    },
    updateAudioTime(percentage) {
      console.log(percentage);
      let audio = this.$store.state.audioPlayer;
      audio.currentTime = percentage / 100 * audio.duration;
    },
    setDuration() {
      this.duration = this.$store.state.audioPlayer.duration;
    }
  }
}
</script>

<style>
html, body {
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5f5f56;
  user-select: none !important;
  width: 100%;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hidden{
  display: none;
}

.grid {
  display: grid;
}

.root-grid {
  grid-template-rows:  96px calc(100% - 6rem - 96px) 6rem;
}

.full-height {
  height: 100%;
}
</style>
