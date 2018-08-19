<template>
    <div>
        <!-- Using Masonry (For grid-view) -->
        <!-- <div v-if="songs && songs.length" v-masonry transition-duration="0.3s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(song, index) in songs" :key="index">
                <song-block :song="song"></song-block>
            </div>
        </div> -->
        <!-- <audio ref="audioPlayer" class="hidden"></audio> -->
        <div v-if="songs && songs.length" class="songs-container">
            <song-block 
                v-for="(song, index) in songs" 
                :key="index" 
                :song="song"
                :pauseAudio="pauseAudio"
                :removeSelectedSong="removeSelectedSong"
                :selectSong="selectSong"
                :playAudio="playAudio"
            ></song-block>
        </div>
        <div v-else>
            <h1>No Songs</h1>
        </div>
    </div>
</template>

<script>
import songBlock from './songBlock.vue';
import {mutationTypes} from '../assets/js/constants';

export default {
    data: function() {
        return {
            selectedSong : null,
            audioPlayer: this.$store.state.audioPlayer
        };
    },
    components: {
        songBlock
    },
    computed: {
        songs: function() {
            return this.$store.state.songs;
        }
    },
    methods: {
        pauseAudio() {
            if(!this.audioPlayer.paused)
                this.audioPlayer.pause();
            // console.log('pause audio');
        },
        removeSelectedSong() {
            
            if(this.selectedSong) {
                // change icon
                this.selectedSong.VueReference.togglePlayPauseSelector();
                // remove selected song
                this.selectedSong = null;
            }

            // console.log('remove selected song');
        },
        selectSong(song, VueReference, src) {
            this.selectedSong = song;
            this.selectedSong.VueReference = VueReference;
            this.selectedSong.src = src;
            // console.log('select new song');
            this.loadAudio(src);
        },
        playAudio() {
            this.audioPlayer.play();
        },
        loadAudio(src) {
            // console.log(src);
            this.audioPlayer.src = src;
            this.audioPlayer.load();
        }
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}
.item {
    min-width: 10rem;
    max-width: 23%;
    max-height: 50rem;
    background-color: darkgrey;
    margin: 1rem;
}

.songs-container > :nth-child(even) {
    background-color: #5d5c5c;
}

.songs-container > :nth-child(odd) {
    background-color: #4d4d4d;
}
</style>
