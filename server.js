
const 	http 					                    = require('http'),
        https 					                    = require('https'),
        path     		                            = require('path'),
		url  					                    = require('url'),
        helpers 			                        = require('./helper/helpers'),
        {ROUTES, STATUS_CODE
        ,PORT, STREAM, ERROR_MESSAGE}               = require('./helper/constants'),
        StringDecoder = require('string_decoder').StringDecoder;


const service = function(routes) {
	const server = {};
	server.router =  {
		[ROUTES.POPULATION]: routes.population
	};
	server.unifidedServer = function(req, res){
		// get methods                              // gets an object
		let method = req.method.toLowerCase(), headers = req.headers;
		// gets the query parameters 
		let parsedUrl = url.parse(req.url, true);
		//get the path name             // get the object after the pathname
		let     path = parsedUrl.pathname;
		let     query = parsedUrl.query;
		// take out the extra slashes
		let trimmedPath = path.replace(/^\/+|\/+$/g,'');
		// get the url params
		const params = helpers.parseParams(trimmedPath.replace("api/population/", ""));
		// get the route 
		const route = helpers.findRoute(params, trimmedPath);
		// need to make this route be available to all changes
		let chosenHandler = typeof(server.router[route]) !== 'undefined'? server.router[route].bind(routes) : routes.notFound;
		let decoder = new StringDecoder('utf-8'); // use to convert buffer to string
		let buffer = '';
		//receives an body
		req.on(STREAM.DATA, function(data){
			// decode buffer object into a string
			buffer += decoder.write(data);
		});
		req.on(STREAM.END, function(){

			buffer += decoder.end();
			let data = {
				'path': trimmedPath, // the pathname
				// Take it as a string 
				//  helpers.parseJsonToObject(buffer)
				'body': buffer,
				method, // [ get, post , put, delete ]
				headers,
				params,
				query, // objects after the path name
			};

			const callback = function(statusCode, payload){ // the callback comes from the router
				// check if its a number
				statusCode = typeof(statusCode) == 'number' ? statusCode : STATUS_CODE.OK;
				// check if its an object
				payload = typeof(payload) == 'object'? payload : null;
				// json to string
				let payloadString = payload?  JSON.stringify(payload): null;
				//parse this as if it was json
				res.setHeader('Content-Type', 'application/json');
				res.writeHead(statusCode);
				if(payloadString){
					res.end(payloadString);
				}else{
					res.end();
				}
			};
		// 	// base on the route that was chosen
			if(chosenHandler){
				chosenHandler(data, callback);
			}else{
				callback(STATUS_CODE.BAD_REQUEST, {[ERROR_MESSAGE.ERROR] : ERROR_MESSAGE.NOT_FOUND}) 
			}
		});
	};
	//Create Server
	server.httpServer = http.createServer((req, res) =>{
		server.unifidedServer(req,res);
	});
    // Open Port For server to listen
    server.httpServer.listen(PORT, ()=> {});
};
module.exports = (routes)=>service(routes);