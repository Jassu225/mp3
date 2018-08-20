<template>
    <div class="song-block" :class="{selected: selected}">
        <div class="song-title" :title="song.title">
            {{ song.title }}
        </div>
        <div class="song-action" @click="playPauseSong()">
            <v-icon title="play">{{ Icons[IconSelector] }}</v-icon>
        </div>
        <div class="song-action">
            <v-icon title="add to queue">{{ AVIcons.queue }}</v-icon>
        </div>
        <div class="song-action">
            <v-icon title="play next">{{ AVIcons.playNext }}</v-icon>
        </div>
        <div class="song-action">
            <v-icon title="add to playlist">{{ AVIcons.playlistAdd }}</v-icon>
        </div>
        <div class="song-artists" :title="song.artists.toString()">
            {{song.artists.toString()}}
        </div>
        <div class="song-album" :title="song.album">
            {{song.album}}
        </div>
        <div class="song-genre" :title="song.genre.toString()">
            {{song.genre.toString()}}
        </div>
        <div class="song-duration">
            {{getReadableTime(song.duration)}}
        </div>
    </div>
</template>

<script>
import { AVIcons } from '../assets/js/constants.js';
import config from '../config.js';

export default {
    data: function() {
        return {
            AVIcons,
            config,
            Icons: [AVIcons.playArrow, AVIcons.pause],
            playIconIndex: 0,
            pauseIconIndex: 1,
            playPauseSelector: 0,
            isPlaying: false
        };
    },
    props: [
        'song', 
        'songIndex',
        'pauseAudio', 
        'removeSelectedSong', 
        'selectSong', 
        'playAudio', 
        'isPaused', 
        'playOrPause',
        'loadAudio'
    ],
    computed: {
        selected: function() {
            let selectedSong = this.$store.state.selectedSong;
            return selectedSong && selectedSong._id == this.song._id;
        },
        IconSelector: function() {
            if(this.selected && this.isPlaying)
                return this.pauseIconIndex;
            else
                return this.playIconIndex;
        }
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
        playPauseSong() {
            // console.log('playPauseSong sequence');
            // if(this.$store.state.selectedSong && (this.$store.state.selectedSong._id == this.song._id)) {
            //     if(this.isPaused()) {
            //         this.playAudio();
            //     } else {
            //         // pause Audio player
            //         this.pauseAudio();
            //     }

            // } else {
            //     // pause Audio player
            //     this.pauseAudio();
            //     // remove old selection
            //     this.removeSelectedSong();
            //     // select this song and play
            //     this.selectSong(this.song, this, `${this.config.apiRootURL + this.config.uploadsDir}/${this.song.title}`);
            //     // play the selected audio source
            //     this.playAudio();
            // }

            // // change icon
            // this.togglePlayPauseSelector();

            // let audio = new Audio(`${this.config.apiRootURL + this.config.uploadsDir}/${this.song.title}`);
            // audio.onloadeddata = () => audio.play();

            // STORE IN STORE
            this.selectSong(this.song);
            // play or pause
            this.playOrPause();
        },
        // These fuctions were called
        // from App.Vue when the respective
        // event is fired.
        AudioEnded() {
            this.isPlaying = false;
        },
        AudioPaused() {
            this.isPlaying = false;
        },
        AudioPlaying() {
            this.isPlaying = true;
        },
        // this function may be called from store
        // after selecting next song based on playMode
        LoadAudio() {
            this.loadAudio(this.song.src);
        }
    },
    mounted: function() {
        // bind songIndex
        this.song.index = this.songIndex;
        // bind VueReference
        this.song.VueReference = this;
        // bind song Src (URL)
        this.song.src = `${this.config.apiRootURL + this.config.uploadsDir}/${this.song.title}`;
        // console.log(this.song.src);
    }
}
</script>

<style scoped>
.song-block {
    height: 3rem;
    display: grid;
    padding-left: 1rem;
    grid-gap: 1rem;
    grid-template-columns: 2fr 2rem 2rem 2rem 2rem 1fr 1fr 1fr 4rem;
}

.song-block > div {
    display: inline-block;
    align-self: center;
    text-align: center;
}

.song-block > .song-title {
    text-align: start;
}

.song-title, .song-artists, .song-album, .song-genre {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.song-action {
    cursor: pointer;
}

.full-height {
    height: 3rem;
}

.selected {
    color: #51acef;
}
.selected .v-icon {
    color: #51acef !important;
}
</style>
