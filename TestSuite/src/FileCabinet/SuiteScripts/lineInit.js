/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define([], function() {

    

    function lineInit(context) {
        try{
             var currec = context.currentRecord;
             log.debug("Working fine",currec)
             var sublistName = context.sublistId;
             if( sublistName == 'item'){
                
               var rate = currec.setCurrentSublistValue({
                    sublistId : 'item',
                    fieldId : 'taxrate1',
                    value : 3000
                });
                log.debug("Rate changed",rate)
             }
        }
        catch(error){
            log.error('Error in lineInit',error);
        }
        
    }

   

    return {
      
        lineInit: lineInit
    }
});
