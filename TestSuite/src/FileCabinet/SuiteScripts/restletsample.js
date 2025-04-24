/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(["N/record"], function(record) {

    function _get(context) {
         try {
            var recObj = record.load({
                type:context.record_type,
                id:context.record_id
            });

            return{
                success : true,
                result:recObj
            }
         } catch (error) {
            log.error("Error in GET",error);
         }
    }

    function _post(context) {
        try {
            var employee = record.create({
                type:'employee'
            });
            employee.setValue({
                fieldId : 'firstname',
                value:context.firstname
            });
            employee.setValue({
                fieldId:'lastname',
                value:context.lastname
            });
            employee.setValue({
                fieldId:'currency',
                value:context.currency
            });
            employee.setValue({
                fieldId:'subsidiary',
                value:context.subsidiary
            });

            return{
                success : true,
                result : 'record created successfully'
            }
        } catch (error) {
            log.error('error in POST',error)
        }
    }

    function _put(context) {
        try{
        var _id = record.submitFields({
            type: context.record_type,
            id: context.record_id,
            values: {
                'phone':'6458907342'
            }
           
        });

        return{
            success : true,
            result : 'successfully updated '+_id
        }
    }catch(e){
         log.error('error in PUT',e)
    }
}

    function _delete(context) {
        try {
            var id_ = record.delete({
                type:record_type,
                id:record_id
            });
            return{
                success:true,
                result : 'successfully deleted '+id_
            }
        } catch (error) {
            log.error('error in DELETE',error)
        }
        
    }

    return {
        get: _get,
        post: _post,
        put: _put,
        delete: _delete
    }
});
