const APPROOT = require('app-root-path');
const Util = require(`${APPROOT}/util/util`);
const moment = require('moment');

module.exports = {
  totalData : async (paramSet, searchResult) => {

    let dataObj={
      totalCount: searchResult[2].hits.total.value,
      size : paramSet.size,
      from : paramSet.from,
      paging : (searchResult[2].hits.total.value > (Number(paramSet.size) * parseInt((searchResult[2].hits.total.value)/paramSet.size)) ? parseInt(searchResult[2].hits.total.value / Number(paramSet.size)) + 1 : searchResult[2].hits.total.value / Number(paramSet.size)),
      response : [] 
    }

    for(let i = 2; i < searchResult.length; i++){
      let result = searchResult[i].hits.hits;
      if(result.length > 0){
        for(cnt of result){
          //데이터 resonse

          dataObj.response.push(list);
        }
      }
    }
    return dataObj;
  },
};


