/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */

define(["N/ui/dialog"], function (dialog) {


    function validateLine(context) {

        try {
            // mode, form, currentRecord
            const sublistName = context.sublistId;
            const currentRecord = context.currentRecord;
            if (sublistName == "item") {
                var amount = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount'
                });

                var item = currentRecord.getCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "item"
                })
                console.log("item", item)
                console.log(amount);

                if (amount > 10000) {
                    let options = {
                        title: 'More than 10,000',
                        message: `The item ${item} and their amount is ${amount}`

                    };
                    dialog.alert(options)


                }

                return true;
            }

        } catch (error) {
            log.error("Erroe in validateLine", error)
        }
    }


    return {

        validateLine: validateLine,

    }
});

