
const {STATUS_CODE}     = require('./constants');


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
      console.log("DATA : ",data);
      repository.fetchData();
      callback(STATUS_CODE.OK);
  }
  route._population.put = function(data, callback){
      console.log("DATA : ",data);
      repository.updateData();
      callback(STATUS_CODE.OK);
  }

  return route;
}

module.exports = controller;