
const {STATUS_CODE}                 = require('../helper/constants');
const {ERROR_MESSAGE}               = require('../helper/constants');

class CountryController {
  repository = null;
  constructor(repository){
    this.repository = repository;
  }
  notFound = function(data , callback){
    callback(404);
  };
  population = function (data, callback){
    const acceptableMethods = ['get', 'put'];
    if(acceptableMethods.indexOf(data.method) > -1){
      // pass in method data and callback
      this[data.method](data,callback); // each method has data and callback
    }else {
      callback(STATUS_CODE.METHOD_NOT_ALLOWED);// method not allowed
    }
  };
  get = function(data, callback){
    if(!data.params.state || !data.params.city){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.STATE_OR_CITY_PARAM_ERROR});
    }
    const location = this.repository.fetchData(data.params);
    if(!location) return callback(STATUS_CODE.BAD_REQUEST, { [ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.STATE_CITY_NOT_FOUND});
    return callback(STATUS_CODE.OK, location);
  }
  put = function(data, callback){
    if(isNaN(+data.body)){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.POPULATION_STRING_ERROR});
    }
    if(+data.body < 0){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.POPULATION_NEGATIVE_ERROR});
    }
    if(!data.params.state || !data.params.city){
      return callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR]: ERROR_MESSAGE.STATE_OR_CITY_PARAM_ERROR});
    }
      const response = this.repository.updateData(data.params, data.body);
      return callback(response.status);
  }
}

module.exports = CountryController;