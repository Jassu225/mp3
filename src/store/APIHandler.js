import http from 'http';
import Promise from 'bluebird';
import config from '../config';
import XHRHandler from './RequestHandler';

const httpGet = Promise.promisify(http.get);

export default class APIHandler { 
    
    static async httpRequest(url) {
        // try {
        //     let json = '';
        //     let res = await httpGet(url); 
            
        //     res.on('data', (d) => {
        //         json += d;
        //     });
            
        //     await res.end;
        //     console.log(json);
        //     return json;
        // } catch (e) {
        //     console.log(e);
        // }
        let result;
        await XHRHandler.newXHRGETRequest(url)
        .then(data => result = data)
        .catch(error => console.log(error));

        return result;
    }
    static getTopTracks() {
        this.httpRequest(config.getTopTracksURL);
    }

    static async getSongs() {
        return await this.httpRequest(config.getSongsURL);
    }
}