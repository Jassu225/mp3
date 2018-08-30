<template>
    <div class="full-height">
        <div v-if="albums && albums.length" class="albums-container overflow">
            <album-block 
                v-for="(album, index) in albums" 
                :key="index" 
                :albumIndex="index"
                :album="album"
                :pauseAudio="pauseAudio"
                :isPaused="isPaused"
                :removeSelectedalbum="removeSelectedalbum"
                :selectalbum="selectalbum"
                :playAudio="playAudio"
                :playOrPause="playOrPause"
                :loadAudio="loadAudio"
            ></album-block>
        </div>
        <div v-else class="full-width">
            <h1>No Albums</h1>
        </div>
    </div>
</template>

<script>
export default {
   computed: {
       albums: function() {
           return this.$store.state.albums;
       }
   }
}
</script>

<style>

</style>
