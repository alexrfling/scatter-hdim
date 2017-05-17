// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'scatter',

    type: 'output',

    factory: function (el, width, height) {

        var scatter = new Scatter(el.id);

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

                if (!scatter.data || hardReload) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var options = {
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

                    scatter.initialize(data, options);

                } else if (newData) {
                    var data = HTMLWidgets.dataframeToD3(x.data);

                    scatter.updateData(data, xKey, yKey, rKey, fKeyCategorical, fKeyContinuous);

                } else if (xKey !== scatter.xKey) {

                    scatter.updateXKey(xKey);

                } else if (yKey !== scatter.yKey) {

                    scatter.updateYKey(yKey);

                } else if (rKey !== scatter.rKey) {

                    scatter.updateRKey(rKey);

                } else if (fKeyCategorical !== scatter.fKeyCategorical) {

                    scatter.updateFKeyCategorical(fKeyCategorical);

                } else if (fKeyContinuous !== scatter.fKeyContinuous) {

                    scatter.updateFKeyContinuous(fKeyContinuous);

                } else if (categorical !== scatter.categorical) {

                    scatter.updateColorScaling(categorical);

                } else if (loColor !== scatter.loColor || hiColor !== scatter.hiColor) {

                    scatter.updateColors(loColor, hiColor);

                }
            },

            resize: function (width, height) {
                // Scatter automatically resizes width
                scatter.resize(height);
            }
        };
    }
});
