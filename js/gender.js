/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Data
var allData = {
    "2000": {
        "Software developer": 24,
        "Computer programmer": 26,
        "Hardware engineer": 22,
        "Network & computer admin": 23
    },
    "2005": {
        "Software developer": 22,
        "Computer programmer": 26,
        "Hardware engineer": 11,
        "Network & computer admin": 19
    },
    "2009": {
        "Software developer": 20,
        "Computer programmer": 20,
        "Hardware engineer": 9,
        "Network & computer admin": 22
    },
    "2013": {
        "Software developer": 19.7,
        "Computer programmer": 23,
        "Hardware engineer": 9.2,
        "Network & computer admin": 17.3
    },
    "2014": {
        "Software developer": 19.8,
        "Computer programmer": 21.4,
        "Hardware engineer": 15.3,
        "Network & computer admin": 19.1
    },
    "2015": {
        "Software developer": 17.9,
        "Computer programmer": 21,
        "Hardware engineer": 12.8,
        "Network & computer admin": 15.9
    },
    "2016": {
        "Software developer": 20,
        "Computer programmer": 22.6,
        "Hardware engineer": 24.7,
        "Network & computer admin": 17.1
    },
    "2017": {
        "Software developer": 18.7,
        "Computer programmer": 21.2,
        "Hardware engineer": 17.2,
        "Network & computer admin": 23.5
    },
    "2018": {
        "Software developer": 19.3,
        "Computer programmer": 21.2,
        "Hardware engineer": 18.9,
        "Network & computer admin": 21.2
    },
    "2019": {
        "Software developer": 18.7,
        "Computer programmer": 20.3,
        "Hardware engineer": 22.8,
        "Network & computer admin": 26.1
    },
    "2020": {
        "Software developer": 19.4,
        "Computer programmer": 21.1,
        "Hardware engineer": 18.4,
        "Network & computer admin": 19.8
    },
    "2021": {
        "Software developer": 19.7,
        "Computer programmer": 19.5,
        "Hardware engineer": 13.4,
        "Network & computer admin": 17.2
    },

};


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

root.numberFormatter.setAll({
    numberFormat: "#a",

    // Group only into M (millions), and B (billions)
    bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" }
    ],

    // Do not use small number prefixes at all
    smallNumberPrefixes: []
});

var stepDuration = 4000;


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "none",
    wheelY: "none"
}));


// We don't want zoom-out button to appear while animating, so we hide it at all
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true
});
// hide grid
yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "network",
    renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    strictMinMax: true,
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.set("interpolationDuration", stepDuration / 10);
xAxis.set("interpolationEasing", am5.ease.linear);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "network"
}));

// Rounded corners for columns
series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// Add label bullet
series.bullets.push(function () {
    return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
            text: "{valueXWorking.formatNumber('#.# a')}" + "%",
            fill: root.interfaceColors.get("alternativeText"),
            centerX: am5.p100,
            centerY: am5.p50,
            populateText: true
        })
    });
});

var label = chart.plotContainer.children.push(am5.Label.new(root, {
    text: "2002",
    fontSize: "8em",
    opacity: 0.2,
    x: am5.p100,
    y: am5.p100,
    centerY: am5.p100,
    centerX: am5.p100
}));

// Get series item by category
function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
        var dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") == category) {
            return dataItem;
        }
    }
}

// Axis sorting
function sortCategoryAxis() {
    // sort by value
    series.dataItems.sort(function (x, y) {
        return y.get("valueX") - x.get("valueX"); // descending
        //return x.get("valueX") - y.get("valueX"); // ascending
    });

    // go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        var seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
            // get index of series data item
            var index = series.dataItems.indexOf(seriesDataItem);
            // calculate delta position
            var deltaPosition =
                (index - dataItem.get("index", 0)) / series.dataItems.length;
            // set index to be the same as series data item index
            if (dataItem.get("index") != index) {
                dataItem.set("index", index);
                // set deltaPosition instanlty
                dataItem.set("deltaPosition", -deltaPosition);
                // animate delta position to 0
                dataItem.animate({
                    key: "deltaPosition",
                    to: 0,
                    duration: stepDuration / 2,
                    easing: am5.ease.out(am5.ease.cubic)
                });
            }
        }
    });
    // sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
        return x.get("index") - y.get("index");
    });
}

var year = 2000;
var index = 0;
var allYears = [2000, 2005, 2009, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];


// update data with values each 1.5 sec
var interval = setInterval(function () {
    index++;
    year = allYears[index];
    if (year > 2021) {
        clearInterval(interval);
        clearInterval(sortInterval);
        index = 0
        year = 2000;
    }

    updateData();
}, stepDuration);

var sortInterval = setInterval(function () {
    sortCategoryAxis();
}, 100);

function setInitialData() {
    var d = allData[year];

    for (var n in d) {
        series.data.push({ network: n, value: d[n] });
        yAxis.data.push({ network: n });
    }
}

function updateData() {
    var itemsWithNonZero = 0;

    if (allData[year]) {
        label.set("text", year.toString());

        am5.array.each(series.dataItems, function (dataItem) {
            var category = dataItem.get("categoryY");
            var value = allData[year][category];

            if (value > 0) {
                itemsWithNonZero++;
            }

            dataItem.animate({
                key: "valueX",
                to: value,
                duration: stepDuration,
                easing: am5.ease.linear
            });
            dataItem.animate({
                key: "valueXWorking",
                to: value,
                duration: stepDuration,
                easing: am5.ease.linear
            });
        });

        yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }
}

setInitialData();
setTimeout(function () {
    console.log(year);
    index++;
    year = allYears[index];
    updateData();
}, 50);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
