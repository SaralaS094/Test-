/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
 define(["N/file", "N/record"], function (file, record) {
 
    function getInputData() {
        try {
            const CSV_FILE = "26567";
 
            var fileLoad =  file.load({
                id: CSV_FILE
            });
 
            fileLoad.getContents();
 
            return fileLoad
 
        } catch (error) {
            log.error("Error in getInputData", error)
        }
    }
 
    function map(context) {
        try {
           
           // log.debug("Map Values ==>", context.value)
           
            var value = context.value.split(',');
           
            var data = {
                postId: value[0],
                id: value[1],
                name: value[2],
                email: value[3],
                body: value[4]
            }
 
            log.debug("data", data)
 
            // context.write({
            //     key: data.postId,
            //     value: data
            // });
 
        } catch (error) {
            log.error("Error in map", error)
        }
    }
 
    function reduce(context) {
        try {
            var values = context.values;
            log.debug("postId values", values);
 
            var customRec = record.create({
                type: 'customrecord_parent_cls_mr_sr',
                isDynamic: true
            });
 
            customRec.setValue({
                fieldId: 'custrecord_post_id_',
                value: context.key
            });
 
            log.debug('cutomrec', customRec)
            for (var i = 0; i < values.length; i++) {
 
                var lineValue = JSON.parse(values[i])
 
                customRec.selectNewLine({
                    sublistId: 'recmachcustrecord_link_parent_'
                });
 
                customRec.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_link_parent_',
                    fieldId: 'custrecord_id',
                    value: lineValue.id
                });
 
                customRec.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_link_parent_',
                    fieldId: 'custrecord_name_',
                    value: lineValue.name
                });
 
                customRec.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_link_parent_',
                    fieldId: 'custrecord_email_fld',
                    value: lineValue.email
                });
 
                customRec.setCurrentSublistValue({
                    sublistId: 'recmachcustrecord_link_parent_',
                    fieldId: 'custrecord_body_',
                    value: lineValue.body
                });
 
                var recId = customRec.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: false
                })
 
                context.write({
                    key: "Results",
                    value: recId
                })
 
                customRec.commitLine({
                    sublistId: 'recmachcustrecord_link_parent_'
 
                });
            }
 
        } catch (error) {
            log.error("Error in reduce", error)
        }
    }
 
    function summarize(summary) {
        try {
 
            var contents = ""
            summary.output.iterator().each(function (key, value) {
 
                contents += (key + ' ' + value + '\n');
                return true;
            });
 
            log.debug("contents", contents)
 
        } catch (error) {
            log.error("Error in summarize", error)
        }
    }
 
    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});
 
 