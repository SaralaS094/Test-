/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
 define(['N/search', 'N/log'], function (search, log) {

    function _post(context) {

        return getSearch(context.type, context.filters, context.columns)
       
        
    }



    function getSearch(type, filters, columns) {
        try {
            var dynamic_search
            if (typeof type === 'string' || type instanceof String) {
                dynamic_search = search.create({
                    type: type,
                    filters: filters,
                    columns: columns
                });
            } else {
                dynamic_search = type
                columns = JSON.parse(JSON.stringify(dynamic_search)).columns
            }

            var result_out = [];
            var myPagedData = dynamic_search.runPaged({ pageSize: 1000 });
            myPagedData.pageRanges.forEach(function (pageRange) {
                var myPage = myPagedData.fetch({
                    index: pageRange.index
                });

                myPage.data.forEach(function (res) {
                    var values = {
                        id: res.id
                    };
                    //iterate over the collection of columns for the value
                    columns.forEach(function (c, i, a) {
                        var key_name = "";

                        if (c.join)
                            key_name = c.join + "_" + c.name
                        else if (c.name.indexOf("formula") > -1)
                            key_name = c.name + "_" + i
                        else
                            key_name = c.name;
                        var value = res.getText(c);

                        if (value == null) {
                            values[key_name] = res.getValue(c);
                        } else {
                            values[key_name] = res.getValue(c);
                            values[key_name + "_txt"] = res.getText(c);
                        }
                    });
                    result_out.push(values);
                });

            });

            return result_out;

        }
        catch (e) {
            log.error("getSearch failed due to an exception", e);
        }
    }
    return {
        post: _post
    }
});
