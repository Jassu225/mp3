import http from 'http';
import {URL} from 'url';
import config from '../config';

export default class APIHandler { 
    createURL(url) {
        return new URL(url);
    }

    httpRequest(url) {
        let json = '';
        const req = http.request(url, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
          
            res.on('data', (d) => {
              json += d;
            });
            res.on('end', () => {
                console.log(json);
            })
        });
          
        req.on('error', (e) => {
            console.error(e);
        });
        req.end();
    }
    getTopTracks() {
        this.httpRequest(config.getTopTracksURL);
    }
}