/**
 * app namespace object
 * @author Carlos Soto <carlos.soto>
 * @author Joe Berger
 */
var app = {
    utils : {},
    instances : {},
    containers : {},
    strings : {},
    conf : {},
    session : {},
    device : 'computer',
    cache : {tpls : {}}
};

/**
 * Renders a pie chart on the desired html id
 * @author Carlos Soto <carlos.soto>
 * @param string htmlId: id of the container (div) for the pie chart
 * @param array data: info to be rendered, array of array pairs of label and value
 * @return Object: plotter object.
 */
app.utils.renderPieChart = function (htmlId, data) {
    'use strict';
    var error = false,
        container = $('#' + htmlId),
        i;
    if (data.length < 1) {
        error = true;
        container.html(_.template(nano.utils.getTemplate(nano.conf.tpls.warning))({msg:'noDataAvailable'}));
    }
    // If it's the mobile version, round up to 
    // integer values and add it to them to the legend
    if (nano.utils.isMobile()) {
        for(var i in data) {
            data[i][1] = Math.round(data[i][1] * 10)/10;
            data[i][0] += ' (' + data[i][1] + '%)';
        }        
    }
    
    if (!error) {
        // Options: http://www.jqplot.com/docs/files/jqPlotOptions-txt.html
        var plot = $.jqplot(htmlId, [data], {
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
            legend: { show:true, location: nano.utils.isMobile() ? 's' : 'e' }
        });
    }
    
    // Remove the percentages from the
    // pie chart if it's a mobile version
    if (nano.utils.isMobile()) {
        container.find('.jqplot-data-label').remove();
    }
    return plot;
};
