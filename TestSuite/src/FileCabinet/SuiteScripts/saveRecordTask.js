/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define([], function() {

    

    function saveRecord(context) {
       
        try{
            var curRec = context.currentRecord;

            var memo = curRec.getText('memo');
    
            var department = curRec.getText('department');
    
            var classfield = curRec.getText('class')
    
            if(memo.length > 15 || !department && !classfield ){
                alert('Provide correct fields');
                return false;
            }
             log.debug('its working',memo)
             log.debug('department',department)
             log.debug('class',classfield)
            return true;   
            

        }
        catch(error){
            log.error('Error in Save Record',error);
        }
      
    }
     
 

    return {
        
        saveRecord: saveRecord
        
    }
});
