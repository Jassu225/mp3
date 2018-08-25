const playlists = {
    init: function(songs) {
        this.sequenceLoopPlaylist.init(songs);
    },
    sequenceLoopPlaylist: new function() {
        let selectedIndex = 0;
        let list = [];
        let loopAll = true;
        this.init = function(songs) {
            songs.forEach((song, index) => {
                list.push({
                    index,
                    songID: song._id
                });
            });
            console.log(list);
        }
        let getIndex = function(songID) {
            let getIndex = function(entry) {
                return entry.songID == songID;
            }
            return list.findIndex(getIndex);
        }
        this.nextIndex = function(songID, autoplay) {
            // console.log(autoplay);
            // after last song return null if loopAll set to false
            if(!loopAll && getIndex(songID) == list.length - 1 && autoplay) return null;
            selectedIndex = (getIndex(songID) + 1) % list.length;
            return selectedIndex;
        }
        this.previousIndex = function(songID, autoplay) {
            // before first song return null if loopAll set to false
            if(!loopAll && getIndex(songID) == 0 && autoplay) return null;
            selectedIndex = (getIndex(songID) - 1 + list.length) % list.length
            return selectedIndex;
        },
        this.loopAll = function() {
            loopAll = true;
        },
        this.onceAll = function() {
            loopAll = false;
        }
    },

}

module.exports = playlists;