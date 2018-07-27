<template>
  <v-layout
    wrap
  >
    <!-- <v-container>
      <v-layout justify-center>
        <v-btn
          color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          Toggle
        </v-btn>
      </v-layout>
    </v-container> -->

    <v-navigation-drawer
      v-model="toggleDrawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-if="usrImg" src="../assets/images/accountIconDefault.png">
            <v-icon v-else>account_circle</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Doe</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>

        <v-list-tile
          @click="navigateToFileUpload()"
        >
          <v-list-tile-action>
            <v-icon>{{ items.upload.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ items.upload.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          @click="navigateToFileUpload()"
        >
          <v-list-tile-action>
            <v-icon>{{ items.profile.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ items.profile.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import {sideNavContent} from '../assets/js/constants.js';

export default {
    props: ['sideNavbar', 'navigateToFileUpload'],
    data () {
        return {
          items: sideNavContent,
          toggleDrawer: false,
          usrImg: null
        }
    },
    watch: {
        // whenever question changes, this function will run
        sideNavbar: function (newVal, oldVal) {
            this.toggleDrawer = !this.toggleDrawer;
        }
    },
    methods: {
        
    }
}
</script>