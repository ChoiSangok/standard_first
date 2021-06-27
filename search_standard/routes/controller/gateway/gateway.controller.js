/* Search API */
// node.js Module
const APPROOT = require('app-root-path');
const path = require('path');
const fileName = path.basename(__filename);
const Util = require(`${APPROOT}/util/util`);
const logger = require(`${APPROOT}/util/logger`)(module);
const Gateway = require(`${APPROOT}/routes/service/gateway.service.js`);
const ResponseModel = require(`${APPROOT}/routes/models/response/index`);

module.exports = {
  autocomplete : async (req, res) => { //자동완성
    try{
      if(req.method === "POST") req.query = req.body;          
      const searchResult = await Gateway.getGatewayServiceResult(req.query, res);
      const modelResult = await ResponseModel.getAutoData(req.query, searchResult);
    
      res.send(Util.sendResStatusByOk(req.query, modelResult, null));
    } catch( err ) {
      // 4-1. If an error occurs, Send Error Info.
      logger.error('---------------------------------------', fileName);
      logger.error(`${req.originalUrl} / (method:${req.method})`, fileName);
      logger.error(err);
      logger.error('---------------------------------------', fileName);
      res.send(Util.errHandler(req, res, err));
    }
  }
};

