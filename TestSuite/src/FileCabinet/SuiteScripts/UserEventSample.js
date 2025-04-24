/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope SameAccount
*/

define(['N/record'], function(record) {

    function beforeLoad(context) {
      // Called before record is loaded.
      try {
        log.debug("beforeLoad Triggered on type",context.type);

        if(context.type == context.UserEventType.VIEW){
            var form = context.form;
            var My1stButton = form.addButton({
                id:'custpage_custom_button',
                label:'My1stButton',
                functionName: 'onClickMy1stButton'
            })
            log.debug("Button is shown ",My1stButton);
        }
      } catch (error) {
               log.error("Error in beforeLoad",error);
      }
    }
  
    function beforeSubmit(context) {
      // Called before record is submitted to the system.
          log.debug("before Submit Triggered on Type" ,context.type);
          log.debug("old value of memo",context.oldRecord.getValue('memo'));
          log.debug("new Record value of memo",context.newRecord.getValue('memo'));

          throw "Error:Not a valid Record"

    }
  
    // function afterSubmit(context) {
    //   // Called after record is submitted to the system.
    // }
  
    return {
      beforeLoad: beforeLoad,
      beforeSubmit: beforeSubmit,
    //   afterSubmit: afterSubmit
    };
  });
  