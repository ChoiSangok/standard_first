const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const setReqParams4search = (req) => {
  const reqParams = {
    type: req.type || 'count',                // 검색이냐
    keyword: req.keyword || '',               // keyword
  }
  return reqParams;
};

// [부가서비스]
const setReqParams4Gateway = (req) =>{
  let result = {};
  let gatewayService = req.gatewayService
  result.sort = req.sort;
  switch (gatewayService) {
    case 'autocomplete':
      // 자동완성, 연관검색어
      result['gatewayService'] = gatewayService;
      result['keyword'] = req.keyword;
      result['label'] = req.label;
      break;
  }
  return result;
}
module.exports = {
  setReqParams4search : setReqParams4search,
  setReqParams4Gateway : setReqParams4Gateway
};
