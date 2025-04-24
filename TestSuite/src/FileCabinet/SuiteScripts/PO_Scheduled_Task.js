/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */
 define(["N/search","SuiteScripts/pts_helper", "N/record"], function(search,util, record) {

    function execute(context) {

      try {

      
       var purchaseorderSearchObj ={
            type: "purchaseorder",
            filters:
            [
               ["mainline","is","T"], 
               "AND", 
               ["email","isempty",""], 
               "AND", 
              ["custbodyphone_number","isempty",""]
            ],
            columns:
            [
                "name",
               "entity",
               "email",
               "custbodyphone_number",
               "internalid"
            ]
         }

         var result = util.getSearch(purchaseorderSearchObj.type,purchaseorderSearchObj.filters,purchaseorderSearchObj.columns);
         

       log.debug("Result===>",result); 

      
       for(let i = 0 ; i < result.length; i++){

            var element = result[i];

            var UpdateTerm = record.create({
                type : "customrecord_custom_fldin_po",
                isDynamic : true
            })

            UpdateTerm.setValue({
                  fieldId : 'custrecord_namefld',
                  value : element.name
            })

             UpdateTerm.setValue({
                fieldId : 'custrecord_emailfld',
                value :element.email
            })

            

            UpdateTerm.setValue({
                fieldId : 'custrecord_phonefld',
                value :element.phone
            })
           

            UpdateTerm.setValue({
                fieldId : 'custrecord_internalidfld',
                value :element.entity
            })
            
            

            // UpdateTerm.setValue({
            //     fieldId : 'custrecord_internal_id_po',
            //     value :element.entity
            // })
        
            var recId = UpdateTerm.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });

           log.debug("recId" ,recId)

        }   
      }catch (error) {
           log.debug("Error" ,error);
      }
    }

//  try{
//      var myPOSearch = search.create({
//             type : 'purchaseorder',
//             title : 'My Custom PO search',
//             id : "customsearch_mycustom_po_search",
//             filters : [
//                 ["mainline","is","T"], 
//                 "AND", 
//                 ["email","isempty",""], 
//                "AND", 
//                 ["custbodyphone_number","isempty",""]
//             ],
//             columns:['entity', 'email', 'custbodyphone_number', 'internalid']
//          })

//          var searchRes = myPOSearch.run();

//          log.debug('searchRes ==>',searchRes);

//         }catch(e){
//             log.error("error==>",e)
//         }



   return {
        execute: execute
    }
});


 