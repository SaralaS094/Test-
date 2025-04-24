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
                   
                },
                options:{
                    enableSourcing : false,
                    ignoreMandatoryFields : true
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
            log.debug("DELETE Request Triggered",JSON.stringify(context));
          
    
            
                var id_ = record.delete({
                    type: "employee",
                    id: '9568',
                       
                   
                });
                return{
                    "Status" : "Success",
                    "Message":"Successfully deleted   " +id_
                }
            } 
            catch (error) {
                log.debug("Error in DELETE",error)
            }
            

          
      
 
  


    }

    return {
        get: handleGet,
        post: _post,
       put:_put,
       delete:_delete

    }
});
