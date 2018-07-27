<template>
  <div>
    <v-toolbar color="black" dark tabs>
      <v-toolbar-side-icon @click.stop="sideNavbar = !sideNavbar"></v-toolbar-side-icon>

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

        <v-tab v-for="item in menuItems" :key="item" @click="$router.go(-1); Tabs = true;">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab" v-if="Tabs">
      <v-tab-item>
        <v-card flat color="transparent" dark>
          <songs-container></songs-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <router-view v-else></router-view>
    <side-nav :sideNavbar="sideNavbar" :navigateToFileUpload="navigateToFileUpload"></side-nav>
  </div>
</template>

<script>
import songsContainer from './songsContainer.vue';
import moreMenu from './moreMenu.vue';
import sideNav from './sideNav.vue';

export default {
  data () {
    return {
      tab: null,
      Tabs: true,
      menuItems: [
        'Songs', 'Album', 'Artists', 'Playlists', 'About Us', 'Contact Us', 'Donate Us'
      ],
      sideNavbar: false
    }
  },
  components: {
    songsContainer,
    moreMenu,
    sideNav
  },
  methods: {
    navigateToFileUpload: function() {
        this.Tabs = false;
        this.$router.push('/fileUpload');
    }
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
