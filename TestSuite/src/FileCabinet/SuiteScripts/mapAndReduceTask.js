/**
 * @NScriptType MapReduceScript
 * @NApiVersion 2.0
 */

define(['N/runtime', 'N/record', 'N/log'], function(runtime, record, log) {
    function getInputData(context) {
       var orderCount = [1,2,3];

        return orderCount;
    }

    function map (orderCount) {
        log.debug('Order Count:', orderCount);
        var rec;
        rec = record.create({
                    type: 'salesorder',
                    isDynamic: true,
                    });

                    rec.setValue({
                        fieldId: 'entity',
                        value: 2135
                    })

                    rec.selectNewLine({
                        sublistId: 'item'
                    });

                    rec.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        value: 102
                    });

                    rec.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        value: 3
                    });

                    rec.commitLine({
                        sublistId: 'item'
                    });

                    rec.save();
                    log.debug({
                        title: "record details",
                        details: rec,
                      });

                      var percentComplete = (orderCount.value * 100)/3;
                      log.debug({
                        title: 'New Sales Orders',
                        details: 'Record creation progress: ' + percentComplete + '%'
                    });

            }

        function summarize(summary) {
            var type = summary.toString();
            log.audit({title: type + ' Usage Consumed ', details: summary.usage});
            log.audit({title: type + ' Concurrency Number ', details: summary.concurrency});
            log.audit({title: type + ' Number of Yields ', details: summary.yields});
        }

    return {
        getInputData: getInputData,
        map: map,
       // reduce: reduce,
        summarize: summarize
    };
})