/**
 * app namespace object
 * @author Joe Berger
 */
var app = {
    utils : {},
    strings : {},
    conf : {},
    device : 'computer',
};

/**
 * Renders a pie chart on the desired html id
 * @param string htmlId: id of the container (div) for the pie chart
 * @param array data: info to be rendered, array of labels and values
 */
app.utils.renderPieChart = function (htmlId, data, $scope) {
    $scope.errorMsg = null;
    var i;
    if (data.length < 1) {
        $scope.errorMsg = app.strings.noDataAvailable;
    }
    else{
        // Options: http://www.jqplot.com/docs/files/jqPlotOptions-txt.html
        var plot = jQuery.jqplot(htmlId, [data], {
            /**
             * Colors that will be assigned to the series.  If there are more series 
             * than colors, colors will wrap around and start at the beginning again.
             */
            seriesColors: [ "#f17961", "#f4b819", "#efe52e", "#7cb940", "#47b7e9", "#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
            grid: {
                    background: '#ffffff',      // CSS color spec for background color of grid.
                    borderColor: '#ffffff',     // CSS color spec for border around grid.
                    shadow: false               // draw a shadow for grid.
            },
            seriesDefaults: {
                // Make this a pie chart.
                renderer: jQuery.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true,
                    sliceMargin: 5
                },
                trendline:{ show: false }
            },
            legend: { show:true, location: 'e' }
        });
    }
};
