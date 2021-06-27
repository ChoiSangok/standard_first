/* Search API */
// node.js Module
const APPROOT = require('app-root-path');
const { termQuery } = require('elastic-builder');
const path = require('path');
const fileName = path.basename(__filename);
const Util = require(`${APPROOT}/util/util`);
const logger = require(`${APPROOT}/util/logger`)(module);
const Search = require(`${APPROOT}/routes/service/search.service.js`);
const ResponseModel = require(`${APPROOT}/routes/models/response/index`);

module.exports = {
  main: async function (req, res) {
    try {
      if(req.method === "POST") req.query = req.body;

      const searchResult = await Search.getTotalData(req.query);
      const modelResult = await ResponseModel.getTotalData(req.query, searchResult.responses, res); 
      res.send(Util.sendResStatusByOk(req.query, modelResult, null));
    } catch (err) {
      // 4-1. If an error occurs, Send Error Info.
      logger.error('---------------------------------------', fileName);
      logger.error(`${req.originalUrl} / (method:${req.method})`, fileName);
      logger.error(err);
      logger.error('---------------------------------------', fileName);
      res.send(Util.errHandler(req, res, err));
    }
  }
};
