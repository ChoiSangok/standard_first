const getData = require('./searchDataInfo');
const getServiceData = require('./serviceDataInfo');

module.exports = {
  getTotalData : getData.totalData,
  
  getAutoData : getServiceData.autoData,
};
