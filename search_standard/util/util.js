// util.js
const APPROOT = require('app-root-path');
const config = require(`${APPROOT}/config/config`);
const logger = require('./logger')(module);

//Empty check
module.exports.getEmpty = function (value) {
  var rtn = true;
  if (!(typeof value === 'undefined' || value === "" || value === undefined || value === " ") && value) {
    rtn = false;
  }
  return rtn;
}
/* [SET] response send OK */
module.exports.sendResStatusByOk = function (req, body, elaspsed) {
  elaspsed = elaspsed != undefined ? elaspsed : {};
  if (req === undefined);
  else {
    // Control
    let obj = {};
    obj.data = body;
    return obj;
  }
};

module.exports.errHandler = function (req, res, err, api_name) {
  let obj = {};
  console.log(err);
  const ret = {
    code: err.status,
    message: err.message
  };
  obj.status = ret;
  return obj;
};


/** [LOG] Request Parameter */
module.exports.reqParam = function (urlname, req, fileName) {
  logger.info('---------------------------------------', fileName);
  logger.info(`${urlname} / (method:${req.method})`, fileName);
  logger.info('---------------------------------------', fileName);
};

