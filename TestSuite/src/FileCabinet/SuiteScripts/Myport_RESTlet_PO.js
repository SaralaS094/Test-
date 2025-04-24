/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(["SuiteScripts/pts_helper","N/record"], function(util,record) {

   

    function _post(context) {
        
        log.debug('request',context);

        switch(context.task){

            case "getPendingApprovals":
                return getPendingApprovals(context);

            case "updateStatus":
                return updateStatus(context)    
        }
    }

    function updateStatus(context){
        try {
            record.submitFields({
                type:"purchaseorder",
                id:context.orderId,
                values: {
                    approvalstatus : context.approvalstatus
                }
            })
            var res = {
                success: true,
                result:"status updated Successfully"
            }

            return res; 

        } catch (e) {
            return{
                success: false,
                error: e
            }
        }
    }

    function getPendingApprovals(context){


        var search = {
            type: "purchaseorder",
            filters: [
                ["mainline", "is" , "T"],
                "AND",
                ["approvalstatus","anyof","1","2","3"]
            
            ],
            columns:["entity","tranid","subsidiary","approvalstatus","trandate"]
        }

        if(context.fromdate && context.todate){
            search.filters.push("AND")

            search.filters.push(["trandate","within",context.fromdate,context.todate])
        }

        return util.getSearch(search.type,search.filters, search.columns);
    }

    return {
        
        post: _post,
       
    }
});
