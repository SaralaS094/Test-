/**
 *@NApiVersion 2.1
 *@NScriptType Portlet
 */
define(["N/file"], function (file) {

    function render(params) {

        params.portlet.title = 'Purchase Order Processor';

        params.portlet.html = `<iframe width="100%" height="400" style="border:none;" src="https://tstdrv2111191.app.netsuite.com/core/media/media.nl?id=26188&c=TSTDRV2111191&h=Y3TDYc1GBDQdmuFNVVsT5MyuC5LFSx1ikjrT6UNRX-FxbeYz&_xt=.html"></iframe>`
    }

    return {
        render: render
    }
});
