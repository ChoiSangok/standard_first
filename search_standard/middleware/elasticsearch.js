const APPROOT = require('app-root-path');
const config = require(APPROOT + '/config/config');
const elasticsearch = require('elasticsearch');

// Class Elasticsearch
// Design Pattern by Singleton
class Elasticsearch {
    // In ES2020, the ability to define "private" class fields using a hash `#` prefix is added.
    // Private class fields is still at Stage 3, while ESLint only supports ECMAScript 2019 at present.
    // We recommend you to use "babel-eslint" if you want to parse it.
    static #instance;
    static #engineMode;
    /*
    * Constructor
    * @param mode : SE 또는 RE
    * */
    constructor(mode) {
        // 1. Check Existed Instance
        if(Elasticsearch.#instance) {
            if(Elasticsearch.#engineMode == mode)
                // 1-1. Return Existed Instance
                return Elasticsearch.#instance;
        }

        // 2. Set private members
        Elasticsearch.#instance = this;
        Elasticsearch.#engineMode = mode;

        /*
        * Getter
        * */
        Elasticsearch.getInstance = () => {
            console.log(Elasticsearch.#instance);
            if (Elasticsearch.#instance) {
                return this;
            }
            return Elasticsearch.#instance;
        };

        Elasticsearch.getEngineMode = () => {
            return Elasticsearch.#engineMode;
        }

        this.elasticClient = new elasticsearch.Client({
            host: config["ELASTICSEARCH_" + mode + "_HOST"],
            requestTimeout: config.ELASTICSEARCH_TIMEOUT
        });
    };

    // @Override Object.toString();
    toString = function getSearchEngineInfo() {
        console.log("##### Elasticsearch Info #####")
        console.log("##### [MODE] : ", this.mode);
        console.log("##### [HOST] : ", config["ELASTICSEARCH_" + mode + "_HOST"]);
    };
    
    /*
    * [client][search] : Single Index/Body Search
    * @param indexName : 검색 대상 index
    * @param searchQuery : 검색 Query
    * */
    singleSearch(indexName, searchQuery) {
        return this.elasticClient.search({
            index: indexName,
            body: searchQuery
        });
    };

    /*
    * [client][msearch] : Multi Index/Body Search
    * @param mapIndexQuery : typeof Map, _mapIndexQuery.set('indexName','searchQuery');
    * @param delimiterStr : Index 구분자
    * */
    multiSearch(mapIndexQuery, delimiterStr) {
        let multiSearchQuery = [];

        for (let queryobj of mapIndexQuery) {
            let index = {'index': delimiterStr + Object.keys(queryobj)};
            let query = queryobj[Object.keys(queryobj)];
            
            multiSearchQuery.push(index);
            multiSearchQuery.push(query);
        }
        
        return this.elasticClient.msearch({
            headers: {"content-type": "application/json"},
            body: multiSearchQuery
        });
    };

}

module.exports = Elasticsearch
