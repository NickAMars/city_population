const fs        = require('fs');
const helpers =require('./helpers');
const {STATUS_CODE}     = require('./constants');
const Country = require('./country.module');

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
            // add to a binary search tree
        });
    } 
    respository.fetchData  =  function ({city, state}){
        // use a bindary search tree to improve performance
        const location = this.findCountry({city, state});
        return location;
    }
    respository.updateData = function({city, state}, population){
        const location = this.findCountry({city, state});
        if(!location){
            const country = new Country (city, state, population);
            this.body.push(country);
            return { status : STATUS_CODE.CREATED, location: country};
        }
        // update location
        location.population = population;
        return { status : STATUS_CODE.OK, location};
    }
    respository.findCountry = function({city, state}){
        return this.body.find( location =>  
            location.city.toLowerCase() === city.toLowerCase()
            && location.state.toLowerCase() === state.toLowerCase());
    }



module.exports = respository;