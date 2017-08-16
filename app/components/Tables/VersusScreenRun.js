export default () => {

    if (!$.fn.jqGrid) return;

    // JSON EXAMPLE
    // ---------------------

    var gridJSON = $("#jqGridJSON");

    gridJSON.jqGrid({
        url: 'server/jqgrid.json',
        datatype: "json",
        colModel: [{
                label: 'Player Name',
                name: 'PlayerName',
                width: 75
            }, {
                label: 'Masteries',
                name: 'Masteries',
                width: 90
            }, {
                label: 'Runes',
                name: 'Runes',
                width: 100
            }, {
                label: 'Items',
                name: 'Items',
                width: 80,
                sorttype: 'integer'
            },
            // sorttype is used only if the data is loaded locally or loadonce is set to true

        ],
        viewrecords: true, // show the current page, data rang and total records on the toolbar
        autowidth: true,
        shrinkToFit: true,
        height: 240,
        rowNum: 20,
        rowList: [10, 20, 30],
        loadonce: true, // this is just for the demo
        caption: "Basic JSON Example",
        hidegrid: false,
        pager: "#jqGridJSONPager"
    });


    $(window).on('resize', function() {
        var width = $('.jqgrid-responsive').width();
        gridJSON.setGridWidth(width);
        gridTree.setGridWidth(width);
    }).resize();

}
