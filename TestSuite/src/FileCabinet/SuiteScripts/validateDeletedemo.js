/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
const items = [];
var mode = ""
define(["N/currentRecord", "N/record"], function (currentRecord, record) {

    function pageInit(context) {
        mode = context.mode;
        console.log("pageInit:Mode", mode);
    }


    function fieldChanged(context) {

        if (context.sublistId == "item" && context.fieldId == "item") {

            console.log("field change started.");

            var currRec = currentRecord.get();

            var item = currRec.getCurrentSublistValue({
                sublistId: "item",
                fieldId: "item"
            })

            if (item) {

                //network call -> ajax to ns server to laod the record;
                //depends on lot factors like network and netsuite 

                // var itemLoadRec = record.load({
                //     type: "inventoryitem",
                //     id: item
                // })

                // var displayName = itemLoadRec.getValue("displayname");


                // currRec.setCurrentSublistValue({
                //     sublistId: "item",
                //     fieldId: "description",
                //     value: displayName,
                //     ignoreFieldChange: true,
                //     forceSyncSourcing: true
                // });

                var itemLoadReq = record.load.promise({
                    type: "inventoryitem",
                    id: item,
                    isDynamic: true
                })

                itemLoadReq.then(function (response) {
                    // DO SOMETHING WITH RESPONSE HERE


                    var displayName = response.getValue("displayname");

                    console.log("displayname", displayName);

                    currRec.setCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "description",
                        value: displayName,
                        ignoreFieldChange: true,
                        forceSyncSourcing: true
                    });

                }, function(error){
                    // DO SOMETHING WITH ERROR HERE
                    console.error("load failed and update of item value failed", e);
                });
            }

            console.log("field change completed. Description is updated");
        }




        return true;

    }



    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    }
});
