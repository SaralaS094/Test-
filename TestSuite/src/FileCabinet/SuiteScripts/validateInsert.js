/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define([], function () {


    function validateInsert(context) {
        try {
            var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            if (sublistName == 'item')
                var quantity = currentRecord.getCurrentSublistValue({
                    sublistId: sublistName,
                    fieldId: 'quantity'
                });
            if (quantity < 5) {
                currentRecord.setCurrentSublistValue({
                    sublistId: sublistName,
                    fieldId: 'quantity',
                    value: '50.0'
                });

                log.debug('quantity ===>', quantity);
                return true;
            }
        } catch (error) {
            log.error("Error", error);
        }

    }






    return {

        validateInsert: validateInsert
    }
});
