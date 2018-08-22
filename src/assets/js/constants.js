const sideNavContent = {
    upload: { title: 'Upload', icon: 'file_upload' },
    profile: { title: 'Profile', icon: 'account_box'},
    filesUploading: { title: 'Files Uploading', icon: 'cloud_upload' }
};

const mutationTypes = {
    CREATE_AUDIO_PLAYER_REFERENCE: 'createAudioPlayerReference',
    CREATE_MUSIC_CONTROLS_REFERENCE: 'createMusicControlsReference',
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
    playNext: 'queue_play_next',
    // controls
    replay: 'replay',
    replayTenSeconds: 'replay_10',
    replayFiveSeconds: 'replay_5',
    fastRewind: 'fast_rewind',
    skipPrevious: 'skip_previous',
    playCircle: 'play_circle_outline',
    pauseCircle: 'pause_circle_outline',
    skipNext: 'skip_next',
    forwardTenSeconds: 'forward_10',
    forwardFiveSeconds: 'forward_5',
    fastForward: 'fast_forward',
    loop: 'loop',
}

const playModes = {
    // Play index-wise from song Array
    SEQUENCE_LOOP: 'sequenceLoop'
}

export {
    sideNavContent,
    mutationTypes,
    actionTypes,
    AVIcons,
    playModes
}