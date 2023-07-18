const fs        = require('fs');
const helpers =require('./helpers');
const {STATUS_CODE}     = require('./constants');
const Country = require('./country.module');
const Graph = require('./graph');

const respository = {};
    respository.graph = null;
    respository.init = function (){
        const readStream = fs.createReadStream(__dirname+"/city_populations.csv", {encoding: 'utf8', hightWaterMark : 32 * 1024});
        let data = '';
        readStream.on('data', function(chunk){
            data+= chunk;
        })
        readStream.on('end', function(){
            const graph = new Graph();
            // store data in body
            helpers.convertData(data, graph);
            respository.graph = graph;
        });
    } 
    //FETCH
    respository.fetchData  =  function ({city, state}){
        return this.graph.search(state, city);
    }
    //UPDATE OR CREATE
    respository.updateData = function({city, state}, population){
        const location = this.graph.search(state, city);
        if(!location){// create
            this.graph.insert(new Country (city, state, population));
            return { status : STATUS_CODE.CREATED};
        }
        // update
        location.population = population;
        return { status : STATUS_CODE.OK};
    }



module.exports = respository;