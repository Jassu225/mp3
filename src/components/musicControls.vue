<template>
    <div class="footer grid">
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
            <v-icon @click="replay">{{ AVIcons.replay }}</v-icon>
            <v-icon>{{ AVIcons.fastRewind }}</v-icon>
            <v-icon @click="previousSong">{{ AVIcons.skipPrevious }}</v-icon>
            <v-icon @click="playPauseAudio">{{ Icons[IconSelector] }}</v-icon>
            <v-icon @click="nextSong">{{ AVIcons.skipNext }}</v-icon>
            <v-icon>{{ AVIcons.fastForward }}</v-icon>
            <v-icon>{{ AVIcons.loop }}</v-icon>
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
      playCircleIndex: 0,
      pauseCircleIndex: 1,
      IconSelector: 0
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
        setTimeout(this.disableDrag, 20) ;
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
      this.IconSelector = this.playCircleIndex;
    },
    setPauseIcon: function() {
      this.IconSelector = this.pauseCircleIndex;
    },
    playPauseAudio: function() {
      let audio = this.$store.state.audioPlayer;
      console.log(audio);
      if(audio.paused) {
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
        previous: true
      });
    },
    nextSong: function() {
      // select next song based on playMode
      this.$store.commit(mutationTypes.SELECT_SONG_BASED_ON_PLAYMODE, {
        next: true,
        previous: false
      });
    },
    replay: function() {
      this.$store.state.audioPlayer.currentTime = 0;
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: black;
  grid-template-rows: 2rem 1fr;
}

.seekbarGrid {
  grid-template-columns: 10% 1fr 10%;
}

.seekbar {
  height: 4px;
  border-radius: 2px;
  align-self: center;
  background-color: #4b4b4b;
  cursor: pointer;
}

.seekedBar {
  height: 100%;
  border-radius: 2px;
  background-color: #417d8d;
  cursor: pointer;
}

.seekbarTip {
  float: right;
  position: relative;
  height: 10px;
  width: 10px;
  margin-top: -3px;
  background-color: #dadcdd;
  border-radius: 50%;
  cursor: pointer;
}

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

.controls > .v-icon:hover {
  color: #839198;
}
.time {
  color: white;
  align-self: center;
}
</style>
