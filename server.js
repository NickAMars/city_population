
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
		let method = req.method.toLowerCase(), headers = req.headers;
		let parsedUrl = url.parse(req.url, true);
		let path = parsedUrl.pathname;
		let query = parsedUrl.query;
		let trimmedPath = path.replace(/^\/+|\/+$/g,'');
		const params = helpers.parseParams(trimmedPath.replace("api/population/", ""));
		const route = helpers.findRoute(params, trimmedPath);
		let chosenHandler = typeof(server.router[route]) !== 'undefined'? server.router[route].bind(routes) : routes.notFound;
		let decoder = new StringDecoder('utf-8');
		let buffer = '';
		req.on(STREAM.DATA, function(data){
			buffer += decoder.write(data);
		});
		req.on(STREAM.END, function(){

			buffer += decoder.end();
			let data = {
				'path': trimmedPath,
				'body': buffer,
				method,
				headers,
				params,
				query,
			};
			//Callback to send back a response to user
			const callback = function(statusCode, payload){
				statusCode = typeof(statusCode) == 'number' ? statusCode : STATUS_CODE.OK;
				payload = typeof(payload) == 'object'? payload : null;
				let payloadString = payload?  JSON.stringify(payload): null;
				res.setHeader('Content-Type', 'application/json');
				res.writeHead(statusCode);
				if(payloadString){
					res.end(payloadString);
				}else{
					res.end();
				}
			};
			//Check if route exist 
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