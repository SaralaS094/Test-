/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */

define(['N/search'], function(search) {
    function render(params) {
        // Check if the portlet is placed in the center column
        var isDetail = (Number(params.column) === 2);
        var portlet = params.portlet;

        // Set the portlet title based on the column it is placed in
        portlet.title = isDetail ? "My Detailed List" : "My List";

        // Add columns to the portlet
        portlet.addColumn({
            id: 'internalid',
            type: 'text',
            label: 'ID',
            align: 'LEFT'
        });

        portlet.addColumn({
            id: 'companyname',
            type: 'text',
            label: 'Company Name',
            align: 'LEFT'
        });

        // If the portlet is in the center column, add extra columns
        if (isDetail) {
            portlet.addColumn({
                id: 'email',
                type: 'text',
                label: 'E-mail',
                align: 'LEFT'
            });
            portlet.addColumn({
                id: 'custentity_multiselect',
                type: 'text',
                label: 'Multiselect',
                align: 'LEFT'
            });
        }

        // Create a filter for the search to find customers with non-empty email field
        var filter = search.createFilter({
            name: 'email',
            operator: search.Operator.ISNOTEMPTY
        });

        // Create a customer search with the specified columns
        var customerSearch = search.create({
            type: 'customer',
            filters: filter,
            columns: ['internalid', 'companyname', 'email', 'custentity_multiselect']
        });

        // Set the number of rows to show in the portlet based on the column it is placed in
        var count = isDetail ? 15 : 5;

        // Run the search and add the results to the portlet
        customerSearch.run().each(function(result) {
            portlet.addRow(result.getAllValues());
            return --count > 0;
        });
    }

    return {
        render: render
    };
});