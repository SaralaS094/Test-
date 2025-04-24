/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
define(["N/record", "SuiteScripts/pts_helper", "SuiteScripts/moment", "N/search"], function (record, util, moment, search) {
  function getInputData() {
    try {
      // var searchObj = {
      //   type: "customrecord_customer_advance",
      //   filters: [["custrecord_apply", "is", "F"]],
      //   columns: 
      //     [
      //         "scriptid",
      //         "custrecord_customerfld",
      //         "custrecord_amtfld",
      //         "custrecord_datefld",
      //         "custrecord_subsidiaryfld",
      //         "custrecord_apply",
      //         "custrecord_accfld",
      //         "custrecord_locfld",
      //         "custrecord_memofld",
      //         "custrecord_deptfld"
      //      ]

      // };
      // var result = util.getSearch(
      //   searchObj.type,
      //   searchObj.filters,
      //   searchObj.columns
      // );

      // return result;

      return search.load({
        id: 1246
      })
    } catch (error) {
      log.error("error in get input data--->", error.message);
    }
  }

  function map(context) {
    try {
      var ctx = JSON.parse(context.value);

      log.debug("ctx", ctx);
      var customerAdvanceRecId = ctx.id;
      var customerId = ctx.custrecord_customerfld;
      var subsidiary = ctx.custrecord_subsidiaryfld;
      var memo = ctx.custrecord_memofld;
      var date = ctx.custrecord_datefld;
     // date = new Date(date)
      var paymentAmount = ctx.custrecord_amtfld;
      var bankAccount = ctx.custrecord_accfld;
      var department = ctx.custrecord_deptfld;
      var location = ctx.custrecord_locfld;
      var apply = ctx.custrecord_apply;
      log.debug("apply", apply);


      var customerDeposit = record.create({
        type: "customerdeposit",
        isDynamic: true,
      });

      customerDeposit.setValue("customer", customerId);
      customerDeposit.setValue("subsidiary", subsidiary);
      customerDeposit.setValue("memo", memo);
      customerDeposit.setValue("trandate", new Date(date));
      customerDeposit.setValue("payment", paymentAmount);
      customerDeposit.setValue("account", bankAccount);
      customerDeposit.setValue("department", department);
      customerDeposit.setValue("location", location);
      // customerDeposit.setValue("undepfunds", "T");
      var recordId = customerDeposit.save({
        enableSourcing: true,
        ignoreMandatoryFields: true,
      });

      log.debug("recordId", recordId);
      if (apply == false && recordId) {
        var customerAdvanceRec = record.load({
          type: "customrecord_customer_advance",
          id: customerAdvanceRecId
        });
        customerAdvanceRec.setValue("custrecord_apply", true)
        customerAdvanceRec.save({
          enableSourcing: true,
          ignoreMandatoryFields: true,
        });
      }
    } catch (error) {
      log.error("error in map--->", error.message);
    }
  }

  return {
    getInputData: getInputData,
    map: map,
  };
});
