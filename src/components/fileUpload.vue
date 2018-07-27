<template>
	<v-card 
		ref="dropZone" 
		@drop="dropHandler" 
		@dragover="dragOverHandler"
		class="bg drop-zone" 
		color=""
		height="30rem"
		width="90%"
	>
		<v-card-text class="center-text-vertically">
			<h1>Drag and Drop one or more files ....</h1>
		</v-card-text>
	</v-card>
</template>

<script>
import config from '../config';
import Promise from 'bluebird';

export default {
  data () {
    return {
      config,
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
		this.removeDragData(ev);
		this.readFilesAndUpload(files);
		// this.uploadFiles(files);
		// console.log(files);
	},
	readFilesAndUpload: function(files) {

		files.forEach(file => {
			let reader = new FileReader();
			let uploadFile = this.uploadFile;
			
			reader.onload = function(read) {
				// console.log(file.name);
				uploadFile({
					name: file.name,
					size: file.size,
					type: file.type,
					binaryString: reader.result
				});
			}
			reader.readAsBinaryString(file);
		});
		
	},
	dragOverHandler: function(event) {
		console.log('File(s) in drop zone'); 

		// Prevent default behavior (Prevent file from being opened)
		event.preventDefault();
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
	uploadFile: function(file) {
		if(file) {
			// console.log(file);
			let xhr = new XMLHttpRequest();
			// let form = new FormData();
			// form.append("songs", files);

			/* event listners */
			xhr.upload.addEventListener("progress", this.uploadProgress, false);
			xhr.addEventListener("load", this.uploadComplete, false);
			xhr.addEventListener("error", this.uploadFailed, false);
			xhr.addEventListener("abort", this.uploadCanceled, false);
			/* Be sure to change the url below to the url of your upload server side script */
			xhr.open("POST", this.config.uploadSongURL);
			let strigifiedFile = JSON.stringify(file);
			// console.log(strigifiedFile);
			xhr.send(strigifiedFile);
			
		}
	},
	createFormWithInput: function() {
		let form = document.createElement("form");
		let input = document.createElement("input");
		input.type = "file";
		form.appendChild(input);
	},
	uploadProgress: function(event) {
		console.log((event.loaded / event.total) * 100);
	},
	uploadComplete: function(event) {
		console.log('upload complete');
	},
	uploadFailed: function(event) {
		console.log('upload failed');
	},
	uploadCanceled: function(event) {
		console.log('upload canceled');
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
}

.center-text-vertically {
	display: table-cell;
	vertical-align: middle;
}
</style>

