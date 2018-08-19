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
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab v-for="item in menuItems" :key="item" @click="Tabs = true;">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <div>
      <v-tabs-items v-model="tab" class="position-absolute" :class="{noOpactiy: !Tabs}">
        <v-tab-item>
          <v-card flat color="transparent" dark>
            <songs-container></songs-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <div v-if="!Tabs" class="position-absolute full-width">
        <router-view 
          name="fileUpload" 
          :config="config"
          :uploadProgress="uploadProgress"
          :uploadComplete="uploadComplete"
          :uploadFailed="uploadFailed"
          :uploadCanceled="uploadCanceled"
          :addToUploadingFiles="addToUploadingFiles"
        ></router-view>
        <router-view
          name="uploadProgress"
          :uploadingFiles="uploadingFiles"
        ></router-view>
      </div>
    </div>
    <side-nav 
      :sideNavbar="sideNavbar"
      :navigateToFileUpload="navigateToFileUpload"
	  :navigateToUploadProgress="navigateToUploadProgress"
      :uploadCount="uploadingFiles.length"
    ></side-nav>
  </div>
</template>

<script>
import songsContainer from './songsContainer.vue';
import moreMenu from './moreMenu.vue';
import sideNav from './sideNav.vue';
import config from '../config';
import urls from '../router/urls';

const INDEX_NOT_FOUND = -1;

export default {
  data () {
    return {
      tab: null,
	  Tabs: true,
	  config,
      menuItems: [
        'Songs', 'Album', 'Artists', 'Playlists', 'About Us', 'Contact Us', 'Donate Us'
      ],
      sideNavbar: false,
      uploadingFiles: []
    }
  },
  components: {
    songsContainer,
    moreMenu,
    sideNav
  },
  methods: {
    navigateTo: function(route) {
      	this.Tabs = false;
      	this.$router.push(route);
        this.sideNavbar = false;
    },
    navigateToFileUpload: function() {
        this.navigateTo(urls.FILE_UPLOAD);
    },
    navigateToUploadProgress: function() {
		this.navigateTo(urls.UPLOAD_PROGRESS);
    },
    uploadProgress: function(fileName, completed) {
		//   console.log(event.loaded);
		//   console.log(event.total);
		this.uploadingFiles[this.getIndex(fileName)].uploadedSize = completed;
    },
    uploadComplete: function(fileName) {
      console.log('upload complete');
      this.uploadingFiles[this.getIndex(fileName)].uploadedSize = this.uploadingFiles[this.getIndex(fileName)].totalSize;
	  this.removeFromUploadingFiles(fileName);
	},
    uploadFailed: function(fileName) {
	  console.log('upload failed');
	  this.removeFromUploadingFiles(fileName);
    },
    uploadCanceled: function(fileName) {
	  console.log('upload canceled');
	  this.removeFromUploadingFiles(fileName);
	},
	addToUploadingFiles: function(files) {
    console.log(files);
		files.forEach(file => {
			if(this.getIndex(file.name) == INDEX_NOT_FOUND) {
				this.uploadingFiles.push({
					name: file.name,
					totalSize: file.base64Size,
					uploadedSize: 0,
					index: this.uploadingFiles.length
				});
			} else {
				console.log(`${file.name} -- duplicate `);
			}
		});

		this.navigateToUploadProgress();
	},
    getIndex: function(fileName) {
      return this.uploadingFiles.findIndex(file => file.name === fileName);
    },
    removeFromUploadingFiles: function(fileName) {
      this.uploadingFiles.splice(this.getIndex(fileName), 1);
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
    .position-absolute {
      position: absolute;
    }
    .full-width {
      width: 100%;
    }
    .invisible {
      visibility: hidden;
    }
    .noOpactiy {
      opacity: 0;
    }
</style>
