<template>
    <div class="song-block">
        <div class="song-title" :title="song.title">
            {{ song.title }}
        </div>
        <div class="song-action" @click="playPauseSong()">
            <v-icon title="play">{{ playPause[playPauseSelector] }}</v-icon>
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
            playPause: [AVIcons.playArrow, AVIcons.pause],
            playPauseSelector: 0
        };
    },
    props: ['song', 'pauseAudio', 'removeSelectedSong', 'selectSong', 'playAudio'],
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
            // pause Audio player
            this.pauseAudio();
            // remove old selection
            this.removeSelectedSong();
            // select this song and play
            this.selectSong(this.song, this, `${this.config.apiRootURL + this.config.uploadsDir}/${this.song.title}`);
            // play the selected audio source
            this.playAudio();
            // change icon
            this.togglePlayPauseSelector();

            // let audio = new Audio(`${this.config.apiRootURL + this.config.uploadsDir}/${this.song.title}`);
            // audio.onloadeddata = () => audio.play();
        },
        togglePlayPauseSelector() {
            this.playPauseSelector = (this.playPauseSelector + 1) % 2;
        }
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
</style>
