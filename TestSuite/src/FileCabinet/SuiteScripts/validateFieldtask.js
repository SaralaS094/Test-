/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define([], function() {

    
        function validateField(context) {
            var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
            var line = context.line;
            if (sublistName === 'item') {
                if (sublistFieldName === 'quantity') {
                    if (currentRecord.getCurrentSublistValue({
                        sublistId: sublistName,
                        fieldId: sublistFieldName
                    }) < 3){
                        currentRecord.setValue({
                            fieldId: 'memo',
                            value: 'Quantity is less than 3'
                        });
                        return false;
                    }
                    else{
                        currentRecord.setValue({
                            fieldId: 'memo',
                            value: 'Quantity accepted'
                        });
                    }
                }
                }
           return true;
        }
 

   
    return {
      
        validateField: validateField,
       
    }
});
