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
        const values = this.root[state.toLowerCase()];
        if (values){
            return values.find(country=> country.city.toLowerCase() === city.toLowerCase());
        }
        return null;
    }
}

module.exports = Graph;