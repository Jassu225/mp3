<template>
    <div class="footer navColor grid">
        <div class="grid seekbarGrid">
            <div class="time">{{ getReadableTime(currentTime) }}</div>
            <div class="seekbarContainer grid">
                <div class="seekbar" ref="seekbar" @mousedown="getOffsetX">
                    <div class="seekedBar" :style="{width: seekbarWidthPercentage + '%'}" style="max-width:100%;">
                        <span ref="seekbarTip" class="seekbarTip"></span>
                    </div>
                </div>
            </div>
            <div class="time">{{ getReadableTime(duration) }}</div>
        </div>
        <div class="controlsContainer grid">
          <div class="controls">
            <v-icon @click="replay()">{{ AVIcons.replay }}</v-icon>
            <v-icon :class="{disabled: !shuffle}" @click="toggleShuffle">{{ AVIcons.shuffle }}</v-icon>
            <v-icon @click="replay(5)">{{ AVIcons.fastRewind }}</v-icon>
            <v-icon @click="previousSong">{{ AVIcons.skipPrevious }}</v-icon>
            <v-icon @click="playPauseAudio">{{ Icons[IconSelector] }}</v-icon>
            <v-icon @click="nextSong">{{ AVIcons.skipNext }}</v-icon>
            <v-icon @click="replay(-5)">{{ AVIcons.fastForward }}</v-icon>
            <v-icon @click="changePlayMode">{{ playModeIcons[playModeIconSelector] }}</v-icon>
          </div>
        </div>
    </div>
</template>

<script>
import { AVIcons, mutationTypes } from '../assets/js/constants';

export default {
  data() {
    return {
      draggable: false,
      seekbarStartPosition: 0,
      seekbarWidth: 0,
      seekbarEndPosition: 0,
      percentageForAudio: 0,
      AVIcons,
      Icons: [AVIcons.playCircle, AVIcons.pauseCircle],
      IconSelector: 0,
      playModeIcons: [AVIcons.loopAll, AVIcons.onceAll, AVIcons.repeatOne],
      playModeIconSelector: 0,
      shuffle: false
    };
  },
  props: ['seekablebarWidth', 'updateAudioTime', 'currentTime' , 'duration'],
  mounted() {
    // this.dragSeekbar();
    window.addEventListener("mouseup", this.addMouseUpListener);
    this.addMouseMoveListener();
    // add reference to store
    this.$store.commit(mutationTypes.CREATE_MUSIC_CONTROLS_REFERENCE, {
      musicControlsReference: this
    });
  },
  computed: {
    seekbarWidthPercentage: function() {
      if(this.draggable)
        return this.seekbarWidth;
      else
        return this.seekablebarWidth;
    },
    // currentTime: function() {
    //   return this.getReadableTime(this.$store.state.audioPlayer.currentTime);
    // },
    // durationTime: function() {
    //   return this.getReadableTime(this.$store.state.audioPlayer.duration);
    // }
  },
  methods: {
    getReadableTime(duration) {
      let seconds = duration, minutes = 0, hours = 0;
      while(seconds > 60) {
          minutes ++;
          seconds -= 60;
      }
      while(minutes > 60) {
          hours ++;
          minutes -= 60;
      }

      seconds = Math.round(seconds);

      return ( 
      `${hours ? hours + ':' : ''}` +
      `${minutes ? (hours ? (minutes >= 10 ? minutes : '0' + minutes) : minutes) : '0'}:` +
      `${seconds ? (seconds > 9 ? seconds: '0' + seconds) : '00'}`
      );
    },
    getOffsetX: function(event) {
      // console.log(event);
      // console.log(this.$el.offsetWidth);
      // console.log(event.offsetWidth);
      // console.log(this.$el.getClientRects());
      let boundinClientRect = this.$refs.seekbar.getBoundingClientRect();
      this.seekbarStartPosition = boundinClientRect.left;
      this.seekbarEndPosition = boundinClientRect.right;
      console.log(this.seekbarEndPosition - this.seekbarStartPosition);
      // this.seekPercentage = ( (event.x - this.seekbarStartPosition) / (this.seekbarEndPosition - this.seekbarStartPosition) );
      this.seekTo( (event.x - this.seekbarStartPosition) / (this.seekbarEndPosition - this.seekbarStartPosition) * 100);
      this.enableDrag();
      // console.log(this.seekPercentage);
      // this.seek = !this.seek;
      // console.log('et')
    },
    addMouseUpListener: function() {
      // console.log("mouseup listener");
      if (this.draggable ) {
        console.log('drag off');
        // this.$store.state.audioPlayer.currentTime = this.width / 100 * this.$store.state.audioPlayer.duration;
        
        // update audio time
        this.updateAudioTime(this.percentageForAudio);
        // disable drag
        setTimeout(this.disableDrag, 40) ;
        // this.playingStarted? this.setTimer() : null;
      }
      // this.removeMouseMoveListener();
    },
    disableDrag: function() {
      // this.removeListener  = !this.removeListener;
      this.draggable = false;
    },
    enableDrag: function() {
      this.draggable = true;
    },
    addMouseMoveListener: function() {
      window.addEventListener("mousemove", this.subsequentSeekbarUIUpdate);
    },
    subsequentSeekbarUIUpdate: function(event) {
      // console.log("mouse move");
      if( this.draggable) {
        // console.log('subsequent seekbar UI update');
        this.seekTo( (event.x - this.seekbarStartPosition) / (this.seekbarEndPosition - this.seekbarStartPosition) * 100);
      }
    },
    seekTo: function(percentage) {
      this.percentageForAudio = percentage;
      // console.log(value);
      this.seekbarWidth = percentage;
    },
    setPlayIcon: function() {
      this.IconSelector = 0;
    },
    setPauseIcon: function() {
      this.IconSelector = 1;
    },
    playPauseAudio: function() {
      let audio = this.$store.state.audioPlayer;
      // console.log(audio);
      if(audio.paused) {
        // if no audio src,
        // it means player has not started yet.
        // so start it by selecting first song in a list
        if(!this.$store.state.selectedSong) {
          this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE, {
            next: true,
            previous: false,
            autoplay: false
          });
        }
        if(audio.readyState == 3 || audio.readyState == 4)
          audio.play();
      } else {
        audio.pause();
      }
    },
    previousSong: function() {
      // select previous song based on playMode
      this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE, {
        next: false,
        previous: true,
        autoplay: false
      });
    },
    nextSong: function() {
      // select next song based on playMode
      this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE, {
        next: true,
        previous: false,
        autoplay: false
      });
    },
    replay: function(value) {
      // console.log(value);
      if(!value)
        this.$store.state.audioPlayer.currentTime = 0;
      else
        this.$store.state.audioPlayer.currentTime -= value;
    },
    changePlayMode: function() {
      this.playModeIconSelector = (this.playModeIconSelector + 1) % this.playModeIcons.length;
      this.$store.commit(mutationTypes.SET_PLAY_MODE, {
        playMode: this.playModeIcons[this.playModeIconSelector]
      });
    },
    toggleShuffle: function() {
      this.$store.commit(mutationTypes.TOGGLE_SHUFFLE);
      this.shuffle = ! this.shuffle;
    }
  }
};
</script>

<style scoped>
.footer {
  grid-template-rows: 2rem 1fr;
}

.seekbarGrid {
  grid-template-columns: 10% 1fr 10%;
}

.seekbar {
  height: 2px;
  border-radius: 2px;
  align-self: center;
  background-color: #4b4b4b;
  cursor: pointer;
}

.seekedBar {
  height: 100%;
  border-radius: 2px;
  background-color: #e14236;
  cursor: pointer;
}

.seekbarTip {
  float: right;
  position: relative;
  height: 10px;
  width: 10px;
  margin-top: -4px;
  background-color: #dadcdd;
  border-radius: 50%;
  cursor: pointer;
  /* opacity: 0; */
  transition: 0.3s opacity ease;
}

/* .seekbarTip:hover {
  opacity: 1;
} */

.controls {
  justify-self: center;
}

.controls > .v-icon {
  cursor: pointer;
  font-size: 2.2rem;
  color: #dddddd;
  margin-right: 1rem;
  padding: 0.2rem;
  border-radius: 50%;
}

.disabled {
  color: #839198 !important;
}

.controls > .v-icon:hover {
  color: #adadad;
}

.time {
  color: white;
  align-self: center;
}
</style>
