<template>
  <div>
    <v-toolbar color="black" dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Mp3 Player</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <more-menu></more-menu>

      <v-tabs
        slot="extension"
        v-model="tab"
        color="black"
        align-with-title
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in menuItems" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <songs-container></songs-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import songsContainer from './songsContainer.vue';
import moreMenu from './moreMenu.vue';

export default {
  data () {
    return {
      tab: null,
      menuItems: [
        'Songs', 'Album', 'Artists', 'Playlists', 'About Us', 'Contact Us', 'Donate Us'
      ]
    }
  },
  components: {
    songsContainer,
    moreMenu
  }
}
</script>

<style>
    .Vuegreen {
        background-color: #2caf77 !important;
        border-color: #2caf77 !important;
    }

    .v-tabs__bar {
        background-color: transparent !important;
    }
</style>
