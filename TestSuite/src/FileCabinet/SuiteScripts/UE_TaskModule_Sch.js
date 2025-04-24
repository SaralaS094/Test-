/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/task'], function(task) {
    function afterSubmit(context) {
        // Ensure the script triggers only on create or edit
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }

        try {
            // Create a task for the scheduled script
            var scheduledTask = task.create({
                taskType: task.TaskType.SCHEDULED_SCRIPT,
                scriptId: 'customscript_sch_eve_trigger_ue_sr', // Replace with your Scheduled Script ID
                deploymentId: 'customdeploy_sch_eve_trigger_ue_sr', // Replace with your Scheduled Script Deployment ID
                params: {
                    custscript_param_key: 'ParameterValue' // Pass any parameters if needed
                }
            });

            // Submit the task to execute the scheduled script
            var taskId = scheduledTask.submit();

            log.debug({
                title: 'Scheduled Script Triggered',
                details: 'Task ID: ' + taskId
            });
        } catch (e) {
            log.error({
                title: 'Error Triggering Scheduled Script',
                details: e.message
            });
        }
    }

    return {
        afterSubmit: afterSubmit
    };
});
