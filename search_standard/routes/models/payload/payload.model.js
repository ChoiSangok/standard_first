// Basic Template Elasticsearch Query
const APPROOT = require('app-root-path');
const esQryMaker = require('elastic-builder');
const Util = require(`${APPROOT}/util/util`);
const index_config = require(`${APPROOT}/config/es_index_conf`);
const ser_index_config = require(`${APPROOT}/config/service_index_config`);

module.exports = {
  getMainQuery: async (reqParams) => {

    let andKeyword = reqParams.keyword;
    
    //config 및 설정값 get
    let from = reqParams.from;
    let size = reqParams.size;
    const config = index_config["search"];
    let fields = config.field.searchField || [];
    let highlightField = config.field.highlightField || [];
    let termsField = config.field.termsField || [];
    let filterQuery = [];

    let esQuery = esQryMaker.boolQuery();

    //쿼리생성
    if(!Util.getEmpty(andKeyword)) {
      //and
      let matchQuery = esQryMaker
        .boolQuery()
        .should(
          esQryMaker
            .multiMatchQuery(fields, andKeyword.trim())
            .operator('and')
            .type("cross_fields")
        )
        //orkeyword
        if(!Util.getEmpty(orKeyword)){
          matchQuery = matchQuery.must(esQryMaker.multiMatchQuery(fields, orKeyword).operator('or').type('cross_fields'))
        }

        esQuery = esQuery.must(matchQuery);
        
        if(!Util.getEmpty(notKeyword)){
          esQuery
            .mustNot(
              esQryMaker
                .multiMatchQuery(fields, notKeyword)
                .operator('or')
                .type('cross_fields')
            )
        }
    }

    //반복하면서 req, reqvalue - filter 
    for(req in reqParams){
      let reqKey = req;
      let reqValue = reqParams[req];
      let filterRangeQuery;

      // 필터
    }
    
    esQuery = esQuery.filter(filterQuery);

    //es query build
    let query = esQryMaker
      .requestBodySearch()
      .query(esQuery)
      .size(size)
      .from(from)
      .trackTotalHits(true);

    // 하이라이트 필드 - highlightField
    if(!Util.getEmpty(highlightField)){
      let highlightQuery = esQryMaker.highlight().fields(highlightField);
      query.highlight(highlightQuery);
    }

    // sort 복수 처리
    if(!Util.getEmpty(reqParams.sort)) {
      let sortParam = reqParams.sort.split(",");
      let sortField;
      //sort
    }

  
    //auto_generate_synonyms_phrase_query
    let queryBody = query._body.query._body.bool;
    
    if(!Util.getEmpty(queryBody.must)){
      let queryMust = queryBody.must[0]._body.bool.must[0]._body.multi_match;
      queryMust.auto_generate_synonyms_phrase_query = 'false';
      if(!Util.getEmpty(queryBody.must[0]._body.bool.must[1])){
        let queryOr = queryBody.must[0]._body.bool.must[1]._body.multi_match;
        queryOr.auto_generate_synonyms_phrase_query = 'false';
      }
      if(!Util.getEmpty(queryBody.must[0]._body.bool.must[2])){
        let queryRe = queryBody.must[0]._body.bool.must[2]._body.multi_match;
        queryRe.auto_generate_synonyms_phrase_query = 'false';
      }
    }
    //must_noT -> auto_generate_synonyms_phrase_query = 'false'
    if(!Util.getEmpty(queryBody.must_not) && !Util.getEmpty(notKeyword)){
      let queryMustNot = queryBody.must_not[1]._body.multi_match
      queryMustNot.auto_generate_synonyms_phrase_query = 'false';
    }
    //return 검색 쿼리
    return query.toJSON();
  },

  // 서비스 쿼리
};

