const sideNavContent = {
    upload: { title: 'Upload', icon: 'file_upload' },
    profile: { title: 'Profile', icon: 'account_box'},
    filesUploading: { title: 'Files Uploading', icon: 'cloud_upload' }
};

const mutationTypes = {
    GET_TOP_TRACKS: 'getTopTracks'
}

const actionTypes = {
    GET_SONGS: 'getSongs',
    GET_SONGS_FROM_SERVER: 'getSongsFromServer'
}

export {
    sideNavContent,
    mutationTypes,
    actionTypes
}