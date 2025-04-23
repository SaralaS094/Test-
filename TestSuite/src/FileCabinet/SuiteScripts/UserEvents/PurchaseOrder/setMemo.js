/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(["N/log"], function(log) {

    function beforeSubmit(context) {
        var newRecord = context.newRecord;
     
        
           var recId = newRecord.id;
           log.debug("recId==>",recId)
           var recType = newRecord.type;
           log.debug(" recType==>", recType)
           newRecord.setValue({
             fieldId:"memo",
              value: "Updated momos"
              
           });
        
     }
     

    return {
      
        beforeSubmit: beforeSubmit
    }
});
