const sideNavContent = {
    upload: { title: 'Upload', icon: 'file_upload' },
    profile: { title: 'Profile', icon: 'account_box'},
    filesUploading: { title: 'Files Uploading', icon: 'cloud_upload' }
};

const mutationTypes = {
    CREATE_AUDIO_PLAYER_REFERENCE: 'createAudioPlayerReference',
    SELECT_SONG: 'selectSong',
    SELECT_SONG_BASED_ON_PLAYMODE: 'selectNextSongBasedOnPlayMode'
}

const actionTypes = {
    GET_SONGS: 'getSongs',
    GET_SONGS_FROM_SERVER: 'getSongsFromServer'
}

const AVIcons = {
    playArrow : 'play_arrow',
    pause: 'pause',
    playlistAdd: 'playlist_add',
    queue: 'queue',
    playNext: 'queue_play_next'
}

const playModes = {
    // Play index-wise from song Array
    SEQUENCE: 'sequence'
}

export {
    sideNavContent,
    mutationTypes,
    actionTypes,
    AVIcons,
    playModes
}