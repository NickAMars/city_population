const 	server 		   						= require('./server'),
		CountryRespository 					= require('./repository/country_repository'),
		CountryController 					= require('./controller/country_controller');
		// Could improve performance with cluster but only should suppose one port 5555
server(new CountryController(new CountryRespository(__dirname+"/city_populations.csv")));