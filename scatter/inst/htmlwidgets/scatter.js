// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'scatter',

    type: 'output',

    factory: function (el, width, height) {

        var chart = new Scatter(el.id);

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
                var hiColor = x.options.hiColor;
                var noTransition = getBool(x.options.noTransition);
                var hardReload = getBool(x.options.hardReload);
                var newData = getBool(x.options.newData);

                if (!chart.data || hardReload) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var options = {
                        width: width,
                        height: height,
                        xKey: xKey,
                        yKey: yKey,
                        rKey: rKey,
                        fKeyCategorical: fKeyCategorical,
                        fKeyContinuous: fKeyContinuous,
                        categorical: categorical,
                        loColor: loColor,
                        hiColor: hiColor,
                        noTransition: noTransition
                    };

                    chart.initialize(data, options);

                } else if (newData) {
                    var data = HTMLWidgets.dataframeToD3(x.data);

                    chart.updateData(data, xKey, yKey, rKey, fKeyCategorical, fKeyContinuous);

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

                } else if (loColor !== chart.loColor || hiColor !== chart.hiColor) {

                    chart.updateColors(loColor, hiColor);

                }
            },

            resize: function (width, height) {
                chart.resize(width, height);
            }
        };
    }
});
