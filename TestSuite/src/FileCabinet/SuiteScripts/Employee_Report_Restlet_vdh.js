/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
 var SEARCH, ERROR;
define(['N/search', 'N/log','N/error'], function (search, log) {
 SEARCH = search;
 //ERROR = error;
    function _post(ctx) {
        var tran_search = SEARCH.create({
        columns: ctx.columns,
            filters: ctx.filters,
            settings: ctx.settings,
            type: ctx.type
    });
       log.debug("filters", ctx.filters);
       log.debug("type", ctx.type);
      
    var results = [];
    var tran_res = tran_search.runPaged({ pageSize: ctx.pagesize });

    if (tran_res.count > 0) {

        tran_res.pageRanges.forEach(function(pageindex) {
            results = results.concat(tran_res.fetch({
                index: pageindex
            }).data);
        });
        log.debug("data", results);
        return tran_res["data"] = results;
    } else {
        return [];
    }
    }
    return {
        post: _post
    }
});
