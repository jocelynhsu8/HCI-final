// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chart-socioecon-div");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
    am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart_socioecon = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart_socioecon.children.push(
    am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    })
);

var data = [{
    "Socioeconomic Status": "Lowest Fifth",
    "e unemployed": 10,
    "E and employed": 18,
    "ne and employed": 46,
    "ne and not employed": 26,
}, {
    "Socioeconomic Status": "Second-lowest Fifth",
    "e unemployed": 10,
    "E and employed": 25,
    "ne and employed": 48,
    "ne and not employed": 18,
}, {
    "Socioeconomic Status": "Middle Fifth",
    "e unemployed": 13,
    "E and employed": 28,
    "ne and employed": 42,
    "ne and not employed": 17,
}, {
    "Socioeconomic Status": "Second-highest Fifth",
    "e unemployed": 20,
    "E and employed": 38,
    "ne and employed": 33,
    "ne and not employed": 10,
}, {
    "Socioeconomic Status": "Highest Fifth",
    "e unemployed": 32,
    "E and employed": 46,
    "ne and employed": 17,
    "ne and not employed": 5,
}]


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart_socioecon.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "Socioeconomic Status",
    renderer: am5xy.AxisRendererX.new(root, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
    }),
    tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart_socioecon.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
    var series = chart_socioecon.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "Socioeconomic Status"
    }));

    series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: 0
    });

    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationY: 0,
            sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: 0,
                centerX: am5.p50,
                populateText: true
            })
        });
    });

    legend.data.push(series);
}

makeSeries("Enrolled and not employed", "e unemployed");
makeSeries("Enrolled and employed", "E and employed");
makeSeries("Not enrolled and employed", "ne and employed");
makeSeries("Not enrolled and not employed", "ne and not employed");


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart_socioecon.appear(1000, 100);




// title: Percentage distribution of 2009 ninth-graders’ postsecondary enrollment and employment statuses, by socioeconomic status: 2016
// https://nces.ed.gov/programs/coe/indicator/tbe/outcomes-by-socioeconomic-status