
class Graph{
    root;
    constructor(){
        this.root = {};
    }
    insert(country){
        const state = country.state.toLowerCase()
        const countries = this.root[state];
        if(!countries){
            this.root[state] = [country];
        }else{
            this.root[state].push(country);
        }
    }
    search(state, city){
        return this.root[state.toLowerCase()].find(country=> country.city.toLowerCase() === city.toLowerCase());
    }
}

module.exports = Graph;