<template>
    <div class="tabs">
      <v-tabs-items v-model="tab"
        class="full-width full-height"
        :class="{noOpactiy: !Tabs, 'position-absolute': !Tabs}"
      >
        <v-tab-item class="full-height overflow">
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
import sideNav from './sideNav.vue';

import {stateProps, mutationTypes} from '../assets/js/constants';
import urls from '../router/urls';

export default {
    components: {
        songsContainer,
        sideNav
    },
    data: function() {
        return {
            uploadingFiles: []
        };
    },
    props: [
        'config'
    ],
    computed: {
        sideNavbar: {
            get: function() {
                return this.$store.state[stateProps.sideNavbar];
            },
            set: function(newValue) {
                this.$store.commit(mutationTypes.TOGGLE_SIDENAV,{
                    newValue
                });
            }
        },
        tab: {
            get: function() {
                return this.$store.state[stateProps.tab];
            },
            set: function(newValue) {
                this.$store.commit(mutationTypes.SWITCH_TABS, {
                    newValue
                });
            }
        },
        Tabs: {
            get: function() {
                return this.$store.state[stateProps.Tabs];
            },
            set: function(newValue) {
                return this.$store.commit(mutationTypes.CHANGE_TABS_VISIBILITY, {
                    newValue
                });
            }
        }
    },
    methods: {
        navigateTo: function(route) {
            console.log(route);
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

<style scoped>
.noOpactiy {
  opacity: 0;
}

.position-absolute {
  position: absolute;
}
</style>

