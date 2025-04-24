/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(["N/currentRecord"], function (currentRecord) {
 
   
 
    function saveRecord(context) {
        try {
 
            var currRec = currentRecord.get();
 
            var memo = currRec.getValue('memo');
 
            if(!memo){
                alert("Please enter the memo");
                return false;
            }
 
            return true;
 
        } catch (e) {
            log.error("Error in saveRecord", e)
        }
    }
 
   
 
    function validateLine(context) {
 
        try {
 
 
            if(context.sublistId == "item"){
 
                log.debug("Triggred","Po da deiiiiii")
                var curRec = currentRecord.get();
 
                var rate = curRec.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate'
                });
 
                log.debug("rate", rate)
 
                if(rate <= 10000){
                    alert("Please change the rate");
                    return false;
                }
            }
 
            return true;
           
        } catch (e) {
            log.error("Error in validateLine", e)
        }
 
    }
 
    
 
    return {
        
        saveRecord: saveRecord,
         validateLine: validateLine
    }
});
 