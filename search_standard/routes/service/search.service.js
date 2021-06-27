const APPROOT = require('app-root-path');
const deepcopy = require('deepcopy');
const Util = require(`${APPROOT}/util/util`);
const Payload = require(`${APPROOT}/routes/models/payload/payload`);
const elasticQuery = require(`${APPROOT}/routes/models/payload/payload.model`);
const searchEngine = require(`${APPROOT}/middleware/elasticsearch`);
const elasticsearch = new searchEngine('SE');
const Gateway = require(`${APPROOT}/routes/service/gateway.service.js`);
const index_config = require(`${APPROOT}/config/es_index_conf`);

// Process Execute Query
module.exports = {
  getTotalData : async (req) => {
    try {
      let reqParams = deepcopy(req);
      // 1. Set Params return Type {Object}
      let index = index_config["search"].index;
      let queryArr = [];  
      let setParams =  Payload.setReqParams4search(reqParams);


      const countQuery = await elasticQuery.getMainQuery(setParams, i);      
      const msearchResult = await elasticsearch.multiSearch(queryArr, "");

      return msearchResult;
    } catch (err) {
      throw err;
    }
  }
};
