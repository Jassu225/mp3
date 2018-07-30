<template>
	<v-card 
		@drop="dropHandler" 
		@dragover="dragOverHandler"
		class="bg drop-zone" 
		color=""
		height="30rem"
		width="90%"
	>
		<v-card-text class="center-text-vertically" @click="getSongsUsingInput">
			<h1>Drag and Drop one or more files ....</h1>
		</v-card-text>
		
		<input 
			type="file" 
			ref="fileInput" 
			accept="audio/mp3"
			@change="sendFiles"
			multiple
			hidden
			name="inputFile"
		/>
	</v-card>
</template>

<script>
import $ from 'jquery';

export default {
  props: [
	  'config', 
	  'uploadProgress', 
	  'uploadComplete', 
	  'uploadFailed', 
	  'uploadCanceled',
	  'addToUploadingFiles'
  ],
  data () {
    return {
      fileUploaded: null
    }
  },
  methods: {
    dropHandler: function(event) {
		console.log('File(s) dropped');

		let ev = event;
		let files = [];
		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();

		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					console.log('... file[' + i + '].name = ' + file.name);
					files.push(file);
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.files.length; i++) {
				console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
			}
		} 
		// Pass event to removeDragData for cleanup
		this.addToUploadingFiles(files);
		this.removeDragData(ev);
		this.stratUpload(files);
	},
	dragOverHandler: function(event) {
		// Prevent default behavior (Prevent file from being opened)
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
	},
	removeDragData: function(ev) {
		console.log('Removing drag data');

		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to remove the drag data
			ev.dataTransfer.items.clear();
		} else {
			// Use DataTransfer interface to remove the drag data
			ev.dataTransfer.clearData();
		}
	},
	stratUpload: function(files) {
		files.forEach(file => {
			file.isFirst = true;
			this.chunkFile(file, 0);
		});
	},
	chunkFile: function(file, start) {
		// console.log(file);
		let next_slice = start + this.config.chunkSize + 1;
		let chunk = file.slice( start, next_slice );
		this.readChunkAndUpload(chunk, start, file);
	},
	readChunkAndUpload: function(chunk, start, file) {

		let reader = new FileReader();
		let uploadChunk = this.uploadChunk;
		
		reader.onloadend = function(read) {
			chunk.base64String = reader.result;
			uploadChunk(chunk, start, file);
		}
		reader.readAsDataURL(chunk);
		
	},
	uploadChunk: function(chunk, start, file) {
		console.log(file.isFirst);
		if(chunk) {
			
			let component = this;
			let xhr = new XMLHttpRequest();
			/* event listners */
			xhr.addEventListener("load", (event) => {
				var size_done = start + component.config.chunkSize;
                // var percent_done = Math.floor( ( size_done / file.size ) * 100 );
				if ( size_done < file.size ) {
                    // Update upload progress
                    this.uploadProgress(file.name, size_done);
					// More to upload, call function recursively
					file.isFirst = false;
                    this.chunkFile(file, size_done );
                } else {
                    // Update upload progress
					
					this.uploadComplete(file.name);
                }
			}, false);
			xhr.addEventListener("error", (event) => {
				this.uploadFailed(file.name);
				console.log(event);
			}, false);
			xhr.addEventListener("abort", (event) => {
				this.uploadCanceled(file.name);
				console.log(event);
			}, false);
			/* Be sure to change the url below to the url of your upload server side script */
			xhr.open("POST", this.config.uploadSongURL);
			let strigifiedFile = JSON.stringify({
				name: file.name,
				base64Data: chunk.base64String,
				isFirst: file.isFirst
			});
			// console.log(strigifiedFile);
			xhr.send(strigifiedFile);
			
		}
	},
	getSongsUsingInput: function(event){
		this.$refs.fileInput.click();
	},
	sendFiles: function() {
		let input = this.$refs.fileInput;
		if ('files' in input) {
			let files = input.files;
			if (files.length > 0) {
				let filesArray = Array.from(files);
				this.addToUploadingFiles(filesArray);
				this.stratUpload(filesArray);
			}
    	} 
	}
  }
}
</script>

<style scoped>
.bg {
	background-color: #9d9d9d;
}

.drop-zone {
	display: table;
	margin: 5%;
	border-radius: 2rem;
	border: 3px dashed grey;
	cursor: pointer;
}

.center-text-vertically {
	display: table-cell;
	vertical-align: middle;
}
</style>

