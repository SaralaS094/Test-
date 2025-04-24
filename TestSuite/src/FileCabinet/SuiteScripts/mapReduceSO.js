/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 */
define(["N/search","N/record"], function(search,record) {

    function getInputData() {
        try {

            var soObj = search.create({
                type: 'salesorder',
                filters :
                [
                    ['type' , 'anyof' , 'SalesOrd'],
                    'AND',
                    ['status','anyof','SalesOrd:B'],
                    'AND',
                    ['trandate','on','today'],
                    'AND',
                    ['mainline' , 'is', 'T']
                ],
    
                columns: [
                    search.createColumn({
                        name: 'internalid',
                        label: 'Internal ID',
                       }),
    
                       search.createColumn({
                        name: 'tranid',
                        label: 'Document Number',
                      })
                ]
            })
    
            log.debug("soObj ==>",soObj);
    
            return soObj;
            
        } catch (error) {
            
            log.error("Error in getInputData ", error)
        }      
   
    }

    function map(context) {

        try {

            log.debug('This is context.value',context.value);
            var data = JSON.parse(context.value);
            var documentNumber = data.values['tranid'];
            var soNumber = data.values['value'];

            log.debug('JSON Received ', data);
            log.debug('SO id ',soNumber);
            log.debug('SO Number' , documentNumber);

            var itemFulfill = record.transform({
                fromType: 'salesorder',
                fromId: soNumber,
                toType: 'itemfulfillment',
              });

              log.debug('itemFulfill',itemFulfill);

              itemFulfill.setSublistValue({
                  sublistId : 'item',
                  fieldId : 'itemreceive',
                  line: 0,
                  value:true
              })

              var itemFulfillSubmit = itemFulfill.save({
                enableSourcing : true,
                ignoreMandatoryFields: true
              })

              log.debug('IF Created and the ID',itemFulfillSubmit)

              context.write({
                key:soNumber,
                value:soNumber
              })


            
        } catch (error) {

            log.error("Error in map",error)
            
        }
        
    }

    function reduce(context) {
        try {
            
            var soId = context.key;
            log.debug('Reduce Stage soID ==>',soId);
            var invoiceCreate = record.transform({
                fromType : 'salesorder',
                fromId:soId,
                toType:'invoice',
                isDynamic : true
            });

            var invoiceCreateSubmit = invoiceCreate.save();

            context.write({
                key : 'Invoiceids',
                value:invoiceCreateSubmit
            })
              log.debug('invoiceIds ==>',invoiceCreateSubmit)

        } catch (error) {
            log.error('Error in Reduce', error)
        }
    }

    // function summarize(summary,context) {

    //     var summaryMessage = 'Usage' +context.usage+ 'Concurrency' +context.concurrency+ 'Number of Yields' +context.yields;
    //     log.audit({
    //         title:'Summary of Usage',
    //         details:summaryMessage
    //     })

    //     if(summary.inputSummary.error){
    //         log.error('Map Error for key:' ,summary.inputSummary.error);
    //     }
    //     summary.mapSummary.errors.iterator().each(function(key,error){
    //         log.error("Map Error for key" +key,error);
    //         return true;
    //     })
    //     summary.reduceSummary.errors.iterator().each(function(key, error){
    //         log.error('Reduce Error for key:' +key,error);
    //         return true;
    //     })
        
    // }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        //summarize: summarize
    }
});
