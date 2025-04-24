/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define([], function() {

    
    function saveRecord(context) {
       try{
             var currentRecord = context.currentRecord;

             var memoField = currentRecord.getText('memo');
             console.log('memo' , memoField);
             log.debug('memo' , memoField);

             if(memoField.length > 15 ){
                alert('Memo should not exceed above 15 characters')
                currentRecord.setValue({
                    fieldId:'memo',
                    value:""
                    
                })
                return false;
             }
             return true;
       }
       catch(error){
          log.error('Error in Save Record' , error)
       } 
    }

  
    return {
       
        saveRecord: saveRecord,
       
    }
});
