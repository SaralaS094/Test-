
  /**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(["N/currentRecord"], function(currentRecord) {
 
 
    function fieldChanged(context) {
        try {
 
            var currRec =  currentRecord.get();
            console.log('Its working')
            log.debug('Field Changed Working' , subsidiary)
           
            if(context.fieldId == "entity"){
               
                var subsidiary = currRec.getText({
                    fieldId: 'subsidiary'
                });
 
                log.debug("subsidiary", subsidiary);
 
                currRec.setValue({
                    fieldId: 'custbody_memo_custom',
                    value: subsidiary
                })
                return true;
            }

            
           
        } catch (error) {
            log.error("Error in fieldChanged",error)
        }
    }
 
   
 
    return {
        // pageInit: pageInit,
        // saveRecord: saveRecord,
        // validateField: validateField,
         fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // lineInit: lineInit,
        // validateDelete: validateDelete,
        // validateInsert: validateInsert,
        // validateLine: validateLine,
        // sublistChanged: sublistChanged
    }
});
 
 