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
                var labelKey = x.options.labelKey;
                var skipTransitions = x.options.skipTransitions;

                if (!scatter.data) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var options = {
                        height: height,
                        xKey: xKey,
                        yKey: yKey,
                        labelKey: labelKey,
                        skipTransitions: skipTransitions,
                        colors: {
                            '<=50K': 'red',
                            '>50K': 'green'
                        }
                    };

                    scatter.initialize(data, options);

                } else if (xKey !== scatter.xKey || yKey !== scatter.yKey) {

                    scatter.updateKeys(xKey, yKey);

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
