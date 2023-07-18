const 	server 		   						= require('./server'),
		cluster								= require('cluster'),
		{availableParallelism}				= require('os'),
		CountryRespository 					= require('./repository/country_repository'),
		CountryController 					= require('./controller/country_controller');
		const numCPUs = availableParallelism();
		const CountryRepository = new CountryRespository(__dirname+"/city_populations.csv");
if(cluster.isPrimary){
	  // Fork workers.
	  for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	  }
}else{
	server(new CountryController(CountryRepository));
}