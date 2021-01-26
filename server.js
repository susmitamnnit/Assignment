const express = require('express');
const app = express();
const _ = require('loadsh');

 var serverList = require('./modules/getServer');
 var getAllServer = require('./models/server_list');
 var get_offlineServer = require('./models/offline_server')
 



app.get('/', (req,res)=>{
    var serverRes = serverList.findServer(getAllServer);
    serverRes.then(data =>{
        if(_.isEmpty(data)){
            res.send(" all server are offine")
        }
        else{
            res.send(data)
        }
    }).catch(err =>{
        res.send(err);
    })

});



const port= 4000;

app.listen(port,()=>{
    console.log("server running on port : " +port);
})