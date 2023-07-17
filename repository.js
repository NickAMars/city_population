const fs        = require('fs');
const helpers =require('./helpers');


// const writeStream = fs.createWriteStream(__dirname+"/data", {encoding: 'utf8'});

const respository = {};
    respository.body = null;
    respository.init = function (){
        const readStream = fs.createReadStream(__dirname+"/city_populations.csv", {encoding: 'utf8', hightWaterMark : 32 * 1024});
        let data = '';
        readStream.on('data', function(chunk){
            data+= chunk;
        })
        readStream.on('end', function(){
            // store data in body
            respository.body  = helpers.convertData(data);
        });
    } 
    respository.fetchData  =  function (){
        // console.log(body)
        console.log('fetch Data');
    }
    respository.updateData = function(){
        console.log('update Data');
    }



module.exports = respository;