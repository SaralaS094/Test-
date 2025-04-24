/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
define(["N/https" , "N/file", "N/email"], function(https, file, email) {

    var headerValues = ['postId' , 'id' , 'name', 'email' , 'body'];

    function getInputData() {
        
        try {

            var response = https.get({
                url: 'https://jsonplaceholder.typicode.com/comments',
                headerValues :{
                    contentType : 'application/json'
                }
            })
    
            var data = JSON.parse(response.body);
    
            return data
            
        } catch (error) {
            log.error("Error in getInputData ==>" , error)
        }
        
        
    }

    function map(context) {

        try {

            const jsonRec = JSON.parse(context.value);

            const csvInRow = headerValues.map(headerValues => {
                if(headerValues == 'body'){
                    var flag = jsonRec[headerValues].split('\n');
                    jsonRec[headerValues] = flag.join(' ');

                    return jsonRec[headerValues];
                }

                return jsonRec[headerValues] || ''
            })

            context.write({
                key : 'csv_row',
                value : csvInRow.join(',')
            })
            
        } catch (error) {
            log.error("Error in map ==>",error)
        }
        
    }

    function reduce(context) {

        try {
            const csvs = [];
            csvs.push(headerValues.join(','));

            context.values.forEach(function(row){
                  csvs.push(row);
            });

           const csvContent = csvs.join('\n');

           log.debug('csvContent ==>' , csvContent)

           const csvFile = file.create({
                  name : 'Output.csv',
                  fileType : file.Type.CSV,
                  contents : csvContent,
                  folder : 15861
           });

           var CSV_FILE = csvFile.save();

           context.write({
               key : 'csvFileId',
               value : CSV_FILE
           })

        } catch (error) {
            log.error("Error in reduce ==>" , error)
        }
        
    }

    function summarize(summary) {
        try {
            var csvFileId;
            summary.output.iterator().each(function (key, value) {

                if (key == 'csvFileId') {
                    csvFileId = value
                }
            })

            log.debug('result', csvFileId);
        
            var email_ = email.send({
                author: 8223,
                body: `Please find the created Csv file below \n csvFile Id ${csvFileId}`,
                recipients: 'sarala.r@prateektechnosoft.com',
                subject: "JSON file is converted to CSV"
            })

           log.debug({
            title: 'Email sent successfully',
            details: email_
           })

        } catch (error) {
            log.error("Error in Summarize ==>" , error)
        }
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});
