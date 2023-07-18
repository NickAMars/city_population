let constants = {};
constants.PORT = 5555;
constants.REQUEST = {
    GET     : 'get',
    PUT     : 'put'
};
constants.STATUS_CODE = {
    OK              : 200,
    CREATED         : 201,
    BAD_REQUEST     : 400,
    NOT_FOUND       : 404,
    METHOD_NOT_ALLOWED       : 405
};
constants.STREAM = {
    DATA    : 'data',
    END     : 'data' 
};
constants.ROUTES=   {
    POPULATION: 'api/population/state/$/city/$'
};
constants.ERROR_MESSAGE = {
    ERROR : 'Error',
    NOT_FOUND : 'Route does not exist',
    STATE_CITY_NOT_FOUND : 'state/city combo cannot be found',
    POPULATION_NEGATIVE_ERROR : 'population cannot be a negative value',
    POPULATION_STRING_ERROR : 'population cannot be a string',
};

module.exports = constants;

