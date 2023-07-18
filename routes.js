
const {STATUS_CODE}     = require('./constants');
const {ERROR_MESSAGE}               = require('./constants');

const controller = (repository)=>{
  let route ={};


  route.notFound = function(data , callback){
      callback(404);
  };
  
  
  route.population = function (data, callback){
      const acceptableMethods = ['get', 'put'];
      if(acceptableMethods.indexOf(data.method) > -1){
        // pass in method data and callback
        route._population[data.method](data,callback); // each method has data and callback
      }else {
        callback(STATUS_CODE.METHOD_NOT_ALLOWED);// method not allowed
      }
  };
  
  
  route._population = {};
  route._population.get = function(data, callback){
      const location = repository.fetchData(data.params);
      if(!location) return callback(STATUS_CODE.BAD_REQUEST, { [ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.STATE_CITY_NOT_FOUND});
      return callback(STATUS_CODE.OK, location);
  }
  route._population.put = function(data, callback){
    if(isNaN(+data.body)){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.POPULATION_STRING_ERROR});
    }
    if(+data.body < 0){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.POPULATION_NEGATIVE_ERROR});
    }
    const response = repository.updateData(data.params, data.body);
    return callback(response.status);
  }

  return route;
}

module.exports = controller;