/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
define(["N/search"], function(search) {

    function getInputData() {
   
        var searchObj = search.create({
            type: "customrecord_map_and_reduce_record",
            columns:
            [
               "name",
               "custrecord_customer_name_in_record",
               "custrecord_subsidiary_record",
               "custrecord_location_in_record"
            ]
         });

         return searchObj;

        
    }

    function map(mapContext) {

        log.debug("mapContext key ==>" , mapContext.key);
        log.debug("mapContext value ==>",mapContext.value);

        var mapContextData = JSON.parse(mapContext.value);

        var name = mapContextData['values']['custrecord_customer_name_in_record']
        var subsidiary = mapContextData['values']['custrecord_subsidiary_record']
        var location = mapContextData['values']['custrecord_location_in_record']

        log.audit( `key : ${context.key}` , `name : ${name}` , `subsidiary : ${subsidiary}` , `location : ${location}` );

        context.write({
            key : subsidiary,
            values : 1
        })
        
    }

    function reduce(reduceContext) {

        log.debug("reduceContext key ==>", reduceContext.key);
        log.debug("reduceContext Value ==>",reduceContext.values);

       var subsidiary = reduceContext.key;
       var count =0;

       reduceContext.values.forEach(function(value) {
               count += parseInt(value)
       });

       reduceContext.write({
           key : subsidiary,
           value : count
       })
        
    }

    function summarize(summaryContext) {

        var content = `Subsidiary,Count<br/>`

        summaryContext.output.iterator().each(function(key, value){

            content += 'Subsidiary ' +key , 'Count ' +value+ '<br/>'

            return true;

        })

        log.debug("content ==>", content);
        
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});
