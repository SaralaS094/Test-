/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define([], function() {

   
    function sublistChanged(context) {
        console.log('Sublist changed is triggered');
        var currentRecord = context.currentRecord;
        var operation = context.operation;
        console.log("operation",operation);
        log.debug('operation',operation);

        if(context.sublistId == 'item'){
            currentRecord.setValue({
                fieldId:'memo',
                value: "total is changed to" +currentRecord.getValue({
                    fieldId:'total',
                }) + ' with operation' +operation
        })
           
        }
    }

    return {
      
        sublistChanged: sublistChanged
    }
});
