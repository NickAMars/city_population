const Country = require('./country.module');
//Constainer for all the Helpers
let helpers = {};
// PARSE a JSON string to an object
helpers.parseJsonToObject = function(str){ // sending to file
    try{
      const obj = JSON.parse(str);
      return obj;
    }catch(error){
      return {};
    }
};
helpers.parseParams = function(str){ // sending to file
  const paramsArr = str.split("/");
  if(paramsArr.length === 4 && paramsArr[0] === 'state' && paramsArr[2] === 'city'){
    return {
      state: paramsArr[1],
      city: paramsArr[3]
    }
  }
  return {};
};

helpers.findRoute = function(params, path){
  const pathArray = path.split('/');
  Object.keys(params).forEach(param => {
    const index = pathArray.indexOf(param) + 1;
    pathArray[index] = '$';
  });
  return pathArray.join("/");
};

helpers.convertData = function(populations){
  populations = populations.split("\n").map(population => {
      return new Country (...population.replace('\r', '').split(','));
    
  });
};

module.exports = helpers;