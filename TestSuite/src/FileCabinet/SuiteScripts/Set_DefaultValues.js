/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(["N/search"], function(search) {

    
    function fieldChanged(context) {

        const sublistVal =context.sublistId;

        if(sublistVal === 'item' || sublistVal === 'expense'){

            const rec = context.currentRecord;

            var vendorId = rec.getValue('entity')

            if(!vendorId){
                return;
            }

            var vendorSearch = search.lookupFields({
                type: 'vendor',
                id: vendorId,
                columns:['custentity_custom_department','custentity_custom_class']
            })
            var deptVal = '';
            var classVal = '';
           classVal = vendorSearch['custentity_custom_class'][0].value;
            deptVal = vendorSearch['custentity_custom_department'][0].value;
            try {
                rec.setCurrentSublistValue({
                    sublistId: sublistVal,
                    fieldId: 'department',
                    value: deptVal, 
                    ignoreFieldChange: true
                });
                rec.setCurrentSublistValue({
                    sublistId: sublistVal,
                    fieldId: 'class',
                    value: classVal,
                    ignoreFieldChange: true
                });
            } catch(e) {
                log.debug({
                    title: 'Unable to set record values',
                    details: 'Unable to set record values for department and class'
                });
            }
        }

    }


    return {
     
        fieldChanged: fieldChanged,
      
    }
});
