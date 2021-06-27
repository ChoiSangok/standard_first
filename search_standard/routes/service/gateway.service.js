const APPROOT = require('app-root-path');
const deepcopy = require('deepcopy');
const request = require('request-promise');
const Util = require(`${APPROOT}/util/util`);
const Payload = require(`${APPROOT}/routes/models/payload/payload`);
const elasticQuery = require(`${APPROOT}/routes/models/payload/payload.model`);
const searchEngine = require(`${APPROOT}/middleware/elasticsearch`);
const elasticsearch = new searchEngine('SE');
const ser_index_config = require(`${APPROOT}/config/service_index_config`);

// Process Execute Query
module.exports = {
  setOpenQuerylog: async (indexName, keyword, searchResult) => {
    try {
      const logSet = Payload.setLog4OpenQueryLog(indexName, keyword, searchResult);
      const logOption = Util.makeURL4QueryLog(logSet);
      return request(logOption);
    } catch (err) {
      throw err;
    }
  },
  getGatewayServiceResult: async (req) => {
    try{
      const reqParams = deepcopy(req);
      let gatewayService = req.gatewayService;
      const setParams = Payload.setReqParams4Gateway(reqParams);

    } catch (err) {
      throw err;
    }
  }
};
