<template>
    <div>
        <div v-if="songs && songs.length" v-masonry transition-duration="0.3s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(song, index) in songs" :key="index">
                <song-block :song="song"></song-block>
            </div>
        </div>
        <div v-else>
            <h1>No Songs</h1>
        </div>
    </div>
</template>

<script>
import songBlock from './songBlock.vue';
import {mutationTypes, actionTypes} from '../assets/js/constants';

export default {
    data: function() {
        return {
        };
    },
    components: {
        songBlock
    },
    computed: {
        songs: function() {
            return this.$store.songs;
        }
    },
    mounted: function() {
        // this.$store.dispatch(actionTypes.GET_SONGS);
    }
}
</script>

<style scoped>
.item {
    min-width: 10rem;
    background-color: darkgrey;
    margin: 1rem;
}
</style>
