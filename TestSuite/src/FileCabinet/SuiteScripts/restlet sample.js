/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
 define(["N/record"], function (record) {

    function handleGet(context) {

        //body
        var type = context.record_type;
        var id = context.record_id;

        var RecObj = record.load({
            type:  type,
            id:  id
        })


        return {
            success: true,
            result: RecObj
        }
    }

    function _post(context) {

        //create Employee
        try {
            var employee = record.create({
                type: "employee"
            })

            log.debug("Employee record created successfully",employee)
    
            employee.setValue({
                fieldId: "firstname",
                value: context.firstname
            })
    
    
            employee.setValue({
                fieldId: "lastname",
                value: context.lastname
            })
    
    
            employee.setValue({
                fieldId: "email",
                value: context.email
            }) 

            employee.setValue({
                fieldId: "subsidiary",
                value : context.subsidiary
            })

            employee.setValue({
                fieldId: "currency",
                value : context.currency
            })
    
    
            return {
                success: true,
                result: employee.save()
            };
    
        } catch (error) {
            log.error("Error in My Post",error)
            return error;
        }
        
    }

    function _put(context) {
        try {
            log.debug("PUT Request Triggered",JSON.stringify(context));

            var id_ = record.submitFields({
                type: context.recordtype,
                id: context.id,
                values : {
                    'phone' : '6456789032',
                   
                }
              
            });
            return{
                "Status" : "Success",
                "Message":"Successfully updated   " +id_
            }
        } catch (error) {
            log.error("Error in my Put",error)
        }
    }

    function _delete(context) {
      
         try {
            var res = record.delete({
                type:context.record_type,
                id:context.record_id
            });

            return{
                "Status" : "Success",
                "Message":"Successfully deleted   "+res
            }
         } catch (error) {
               log.error('error',e)
               return{
                "Status" : "failed",
                "Message":"Failed deleted   "+error
            }
         }
     }

    return {
        get: handleGet,
        post: _post,
       put:_put,
       delete:_delete

    }
});
