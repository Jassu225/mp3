import http from 'http';
import {URL} from 'url';
import Promise from 'bluebird';
import config from '../config';

const httpGet = Promise.promisify(http.get);

export default class APIHandler { 
    static createURL(url) {
        return new URL(url);
    }

    static async httpRequest(url) {
        try {
            let json = '';
            let res = await httpGet(url); 
            
            res.on('data', (d) => {
                json += d;
            });
            
            await res.end;
            return json;
        } catch (e) {
            console.log(e);
        }
    }
    static getTopTracks() {
        this.httpRequest(config.getTopTracksURL);
    }
    static async getSongs() {
        return await this.httpRequest(config.getSongsURL);
    }
}