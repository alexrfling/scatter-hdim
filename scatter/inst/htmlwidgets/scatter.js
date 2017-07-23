// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'scatter',

    type: 'output',

    factory: function (el, width, height) {

        var chart = new d3.Scatter(el.id);

        // booleans converted from R may be true, false, 'TRUE', or 'FALSE'
        function getBool (bool) {
            return (bool === true || bool === 'TRUE');
        }

        return {
            renderValue: function (x) {
                var xKey = x.options.xKey;
                var yKey = x.options.yKey;
                var rKey = x.options.rKey;
                var fKeyCategorical = x.options.fKeyCategorical;
                var fKeyContinuous = x.options.fKeyContinuous;
                var categorical = getBool(x.options.categorical);
                var loColor = x.options.loColor;
                var mdColor = x.options.mdColor;
                var hiColor = x.options.hiColor;
                var numColors = x.options.numColors;
                var noTransition = getBool(x.options.noTransition);
                var hardReload = getBool(x.options.hardReload);
                var newData = getBool(x.options.newData);

                if (!chart.data || hardReload) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var options = {
                        width: width,
                        height: height,
                        rKey: rKey,
                        fKeyCategorical: fKeyCategorical,
                        fKeyContinuous: fKeyContinuous,
                        categorical: categorical,
                        loColor: loColor,
                        hiColor: hiColor,
                        noTransition: noTransition
                    };

                    chart.initialize(data, xKey, yKey, options);

                } else if (newData) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var options = {
                        rKey: rKey,
                        fKeyCategorical: fKeyCategorical,
                        fKeyContinuous: fKeyContinuous,
                        noTransition: noTransition
                    };

                    chart.updateData(data, xKey, yKey, options);

                } else if (xKey !== chart.xKey) {

                    chart.updateXKey(xKey);

                } else if (yKey !== chart.yKey) {

                    chart.updateYKey(yKey);

                } else if (rKey !== chart.rKey) {

                    chart.updateRKey(rKey);

                } else if (fKeyCategorical !== chart.fKeyCategorical) {

                    chart.updateFKeyCategorical(fKeyCategorical);

                } else if (fKeyContinuous !== chart.fKeyContinuous) {

                    chart.updateFKeyContinuous(fKeyContinuous);

                } else if (categorical !== chart.categorical) {

                    chart.updateColorScaling(categorical);

                } else if (
                    loColor !== chart.loColor ||
                    mdColor !== chart.mdColor ||
                    hiColor !== chart.hiColor ||
                    numColors !== chart.numColors) {

                    chart.updateColors(loColor, mdColor, hiColor, numColors);

                }
            },

            resize: function (width, height) {
                chart.resize(width, height);
            }
        };
    }
});
