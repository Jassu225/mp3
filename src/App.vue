<template>
  <v-app>
    <navbar></navbar>
    <audio 
      ref="audioPlayer" 
      class="hidden"
      @ended="audioEnded"
      @pause="audioPaused"
      @play="audioPlaying"
    ></audio>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';
import {actionTypes, mutationTypes} from './assets/js/constants';

export default {
  components: {
    navbar
  },
  data () {
    return {
      
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
      this.$store.state.selectedSong.VueReference.AudioEnded();
      // select next song based on playMode
      this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE);
    },
    audioPaused() {
      if(!this.$refs.audioPlayer.ended)
        this.$store.state.selectedSong.VueReference.AudioPaused();
    },
    audioPlaying() {
      this.$store.state.selectedSong.VueReference.AudioPlaying();
    }
  }
}
</script>

<style>
html {
  overflow: auto;
}
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5f5f56;
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
</style>
