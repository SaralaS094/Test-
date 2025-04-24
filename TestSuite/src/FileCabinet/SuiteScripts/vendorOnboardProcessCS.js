 /**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

 const SUITELET_SCRIPT_ID = 'customscript_vendor_onboard_email_sr';
 const SUITELET_DEPLOY_ID = 'customdeploy_vendor_onboard_email_sr';

 

define(["N/url"], function(url) {

    function pageInit(context) {
    
        try {

        var value = context.value;

         log.debug("context.value==>",value);
        
     } catch (error) {

        log.debug("Error in pageInit ",error);

     }

    }
  
    function sendInviteMail(email, id){
           
        try {
            
            log.debug("email ==>",email);

            log.debug("id ==>" ,id);

            var suiteScriptId = url.resolveScript({

                scriptId:SUITELET_SCRIPT_ID,

                deploymentId:SUITELET_DEPLOY_ID,

                params: {

                    recordid: id,

                    email: email

                }

            });

            log.debug("suiteScriptId ==>",suiteScriptId);

            var result = fetch(suiteScriptId);

            result.then(function (data){

                   alert('Email sent Successfully');

                   console.log(result);

            })

        } catch (error) {
            
            log.debug("Error in sendInviteMail==>",error);

        }
    }
  
    return {

      pageInit : pageInit,

      sendInviteMail : sendInviteMail

    };
  });
  