import Promise from  'bluebird';

class XHRHandler {
    static newXHRGETRequest(url) {

        return new Promise( (resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("load", (event) => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
                // if(LoadEventCB) LoadEventCB(event);
            }, false);
            xhr.addEventListener("error", (event) => {
                // if(ErrorEventCB) ErrorEventCB(event);
                reject(xhr.statusText);
            }, false);
            xhr.addEventListener("abort", (event) => {
                // if(AbortEventCB) AbortEventCB(event);
                reject(xhr.statusText);
            }, false);

            // compusory for making a CORS request
            // xhr.withCredentials = true;
			
            /* Be sure to change the url below to the url of your upload server side script */
            xhr.open("GET", url);


            // add cors headers
			// xhr.setRequestHeader('Access-Control-Allow-Origin','*');
			// xhr.setRequestHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
            // xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
            
            xhr.send();
        });
    }
}

module.exports = XHRHandler;