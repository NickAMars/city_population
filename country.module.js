module.exports = class Country {
                    state = null;
                    city = null;
                    population = null;
                    constructor( city, state, population){
                        this.city = city;
                        this.state = state;
                        this.population = population;
                    }
                }