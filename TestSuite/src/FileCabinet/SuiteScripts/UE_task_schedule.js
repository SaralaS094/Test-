/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(["N/task"], function(task) {

   

    function afterSubmit(context) {
        try {
            
            var my_task = task.create({
                taskType : task.TaskType.SCHEDULED_SCRIPT,
                scriptId : 'customscript_sch_trigger_task_ue_sr',
                deploymentId : 'customdeploy_sch_trigger_task_ue_sr',
                params : {
                    custscript_email_ : "sarala.r@prateektechnosoft.com"
                }
            });

             var taskId = my_task.submit();

             log.debug('My Scheduled Script is Triggered',taskId);
        } catch (error) {
            log.error("Error in My Task",error);
        }
    }

    return {
       
        afterSubmit: afterSubmit
    }
});
