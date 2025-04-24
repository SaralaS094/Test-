 /**
* @NApiVersion 2.1
* @NScriptType UserEventScript
*/

define([], function() {

    function beforeLoad(context) {
            try {
                log.debug("context===>",context.newRecord);

                var form = context.form;
                 
                var email = context.newRecord.getValue('custrecord_vendor_email_');

                var vendor_id = context.newRecord.getValue('id');

                if(context.type == "view"){

                    var vendorId = context.newRecord.getValue('custrecord_vendor_ref_id');

                    log.debug("vendorId==>",vendorId);

                    if(!vendorId){

                        form.clientScriptFileId = 26427;

                        form.addButton({

                            id:'custpage_send_mail_btn',
    
                            label:'Send Email',
    
                            functionName:`sendInviteMail ('${email}','${vendor_id}')`
    
                        
                        })
                    
                    }

                }

                
            } catch (error) {
                
                      log.error('Error in beforeLoad', error);

            }
    }
  
   
    return {

      beforeLoad: beforeLoad,
 
    }
 
});
  