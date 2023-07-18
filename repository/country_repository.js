const fs        = require('fs');
const helpers =require('../helper/helpers');
const {STATUS_CODE}     = require('../helper/constants');
const Country = require('../modules/country.module');
const Graph = require('../modules/graph');

class CountryRespository{
    graph = null;
    constructor(file){
        this.graph = new Graph();
        const readStream = fs.createReadStream(file, {encoding: 'utf8', hightWaterMark : 32 * 1024});
        let data = '';
        readStream.on('data', function(chunk){
            data+= chunk;
        });
        readStream.on('end', function(){
            // store data in body
            helpers.convertData(data, this.graph);
        }.bind(this));
    }
    fetchData  =  function ({city, state}){
        return this.graph.search(state, city);
    }
    updateData = function({city, state}, population){
        const location = this.graph.search(state, city);
        if(!location){// create
            this.graph.insert(new Country (city, state, population));
            return { status : STATUS_CODE.CREATED};
        }
        // update
        location.population = population;
        return { status : STATUS_CODE.OK};
    }
}



module.exports = CountryRespository;