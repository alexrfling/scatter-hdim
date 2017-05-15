// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'scatter',

    type: 'output',

    factory: function (el, width, height) {

        var scatter = new Scatter(el.id);

        return {
            renderValue: function (x) {
                var xKey = x.options.xKey;
                var yKey = x.options.yKey;
                var rKey = x.options.rKey;
                var fKeyCategorical = x.options.fKeyCategorical;
                var fKeyContinuous = x.options.fKeyContinuous;
                var categorical = x.options.categorical;
                var skipTransitions = x.options.skipTransitions;
                var loColor = x.options.loColor;
                var hiColor = x.options.hiColor;

                if (!scatter.data) {
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
                        skipTransitions: skipTransitions
                    };

                    scatter.initialize(data, options);

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

                } else {
                    var data = HTMLWidgets.dataframeToD3(x.data);

                    scatter.updateData(data);
                }
            },

            resize: function (width, height) {
                // Scatter automatically resizes width
                scatter.resize(height);
            }
        };
    }
});
