const helper = require('../modules/_helper');
const https = require('https');
const express = require('express');
const app = express();

module.exports = {
    findServer: (serverList) => {
        length = serverList.length;
        completed_request = 0;
        const result = [];
        return new Promise((resolve, reject) => {
            for (i in serverList) { // start of loop
            var req = https.get(serverList[i]['url'], (function (res) {
                    completed_request++;
                    responseCode = res.statusCode;
                    console.log(responseCode);
                    if (responseCode >= 200 && responseCode <= 299) { // responseCode b/w 200 to 299 
                        result.push(this);
                        console.log(result);
                    }

                    if (completed_request >= length) {
                        var lowestPriority = helper.getServerWithLowestPriority(result);
                        console.log(lowestPriority) 
                        resolve(lowestPriority); // get server with lowest priority
                    }
                }).bind(serverList[i]))
                    .on('error', function (err) {
                        completed_request++;

                        if (completed_request >= length) {
                            var lowestPriority = helper.getServerWithLowestPriority(result);
                            resolve(lowestPriority);
                        }
                    })
                    .on('abort', (function (err) {
                        completed_request++;
                    }).bind(serverList[i]))

                req.setTimeout(5000, (function () {
                    req.abort();

                }).bind(serverList[i]))


            }  // end of look 

        })

    }


}
