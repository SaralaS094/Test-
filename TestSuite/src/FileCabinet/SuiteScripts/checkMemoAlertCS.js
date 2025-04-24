/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(["N/url","N/https","N/ui/dialog"], function(url,https,dialog) {

   
    function saveRecord(context) {

        var poRec = context.currentRecord;

        var memo = poRec.getValue({
            fieldId : 'memo'
        })

        var suiteletUrl = url.resolveScript({
            deploymentId: 'customdeploy_check_memo_sl_sr',
            scriptId: 'customscript_check_memo_sl_sr',
        })

        var response = https.post({
            body: memo,
            url: suiteletUrl
          
        })

        log.debug("Response ==> ",JSON.stringify(response))

        if(response.body == 'F'){
            dialog.alert({
                title: 'Warning',
                message: 'Memo is Empty, Please fill the memo field'
            })
            return false;
        }
        
        return true;


        
    }

  

    return {
       
        saveRecord: saveRecord,
      
    }
});
