/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define([], function () {
 
    function pageInit(context) {
        try {
            const currentRecord = context.currentRecord;
 
            // ui => client => browser
            // server => user event => backend => server(system)
 
            var memo = currentRecord.getValue({ fieldId: 'memo' });
            console.log(memo);
 
            var count = currentRecord.getLineCount({
                sublistId: "item"
            })
 
            console.log(count);
 
            var result = [];
 
            for (let i = 0; i < count; i++) {
                var item = currentRecord.getSublistValue({
                    sublistId: "item",
                    fieldId: "item",
                    line: i
                });
                console.log("item =>", item);
 
                var amount = currentRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: i
                })
                console.log("amount =>", amount);
 
                result.push({
                    item: item,
                    amount: amount
                })
 
               
            }
            console.log(result);
 
        } catch (error) {
            log.error("Erro in pageInit", error);
        }
    }
 
 
 
 
 
    return {
        pageInit: pageInit
    }
});
 
 
