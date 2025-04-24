/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["N/record"], function(record) {

    function _get(context) {
        
    }

    function _post(context) {
        

        var recObj = record.create({
            type:'customer'
        });

        recObj.setValue({
            fieldId : 'companyname',
            value : context.name
        })

        recObj.setValue({
            fieldId:'subsidiary',
            value:context.subsidiary
        })

        recObj.setValue({
            fieldId:'isperson',
            value:context.type
        })


      

        ignoreMandatoryFields = true

        return {
            success: true,
            result: recObj.save()
        };

       
    }

    function _put(context) {
        
    }

    function _delete(context) {
        
    }

    return {
        get: _get,
        post: _post,
        put: _put,
        delete: _delete
    }
});
