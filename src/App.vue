<template>
  <v-app>
    <div class="main-grid grid full-height">
      <navbar></navbar>
      <audio 
        ref="audioPlayer" 
        class="hidden"
        @ended="audioEnded"
        @pause="audioPaused"
        @play="audioPlaying"
        @timeupdate="updateSeekbarWidth"
      ></audio>
      <music-controls 
        :seekablebarWidth="seekablebarWidth"
        :updateAudioTime="updateAudioTime"
      ></music-controls>
    </div>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';
import musicControls from './components/musicControls.vue';
import {actionTypes, mutationTypes} from './assets/js/constants';

export default {
  components: {
    navbar, musicControls
  },
  data () {
    return {
      seekablebarWidth: 0
    }
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
    updateSeekbarWidth() {
      let audio = this.$store.state.audioPlayer;
      this.seekablebarWidth = audio.currentTime / audio.duration * 100;
      // console.log(this.seekablebarWidth);
    },
    updateAudioTime(percentage) {
      console.log(percentage);
      let audio = this.$store.state.audioPlayer;
      audio.currentTime = percentage / 100 * audio.duration;
    }
  }
}
</script>

<style>
html {
  overflow-x: auto;
  overflow-y: hidden;
}
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5f5f56;
  user-select: none !important;
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

.main-grid {
  grid-template-rows: 1fr 4rem;
}

.full-height {
  height: 100%;
}
</style>
