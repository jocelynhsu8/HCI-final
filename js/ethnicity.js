// create 2 data_set

// Facebook, Apple (?), Airbnb, Netflix, Google, Microsoft, Pinterest, Twitter, eBay, nVidia, 

var white = [
    { group: "U.S.", value: 61 },
    { group: "Facebook", value: 49 },
    { group: "AirBnB", value: 50 },
    { group: "Netflix", value: 49 },
    { group: "Google", value: 53 },
    { group: "Microsoft", value: 56 },
    { group: "Pinterest", value: 48 },
    { group: "Twitter", value: 44 },
    { group: "eBay", value: 50 },
    { group: "Nvidia", value: 37 },
];

var asian = [
    { group: "U.S.", value: 6 },
    { group: "Facebook", value: 40 },
    { group: "AirBnB", value: 36 },
    { group: "Netflix", value: 24 },
    { group: "Google", value: 36 },
    { group: "Microsoft", value: 31 },
    { group: "Pinterest", value: 41 },
    { group: "Twitter", value: 26 },
    { group: "eBay", value: 39 },
    { group: "Nvidia", value: 45 },
];

var latino = [
    { group: "U.S.", value: 18 },
    { group: "Facebook", value: 5 },
    { group: "AirBnB", value: 7 },
    { group: "Netflix", value: 6 },
    { group: "Google", value: 4 },
    { group: "Microsoft", value: 6 },
    { group: "Pinterest", value: 6 },
    { group: "Twitter", value: 3 },
    { group: "eBay", value: 6 },
    { group: "Nvidia", value: 3 },
];

var black = [
    { group: "U.S.", value: 13 },
    { group: "Facebook", value: 3 },
    { group: "AirBnB", value: 3 },
    { group: "Netflix", value: 4 },
    { group: "Google", value: 3 },
    { group: "Microsoft", value: 4 },
    { group: "Pinterest", value: 3 },
    { group: "Twitter", value: 3 },
    { group: "eBay", value: 3 },
    { group: "Nvidia", value: 1 },
];


// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// add the chart title
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("text-decoration", "underline")
    .text("Ethnic Breakdown in Top Tech Companies");

//Create X axis label   
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 30)
    .style("text-anchor", "middle")
    .text("Company");

//Create Y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 10)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentage (%)");

// X axis
var x = d3.scaleBand()
    .range([0, width])
    .domain(white.map(function (d) { return d.group; }))
    .padding(0.2);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 65])
    .range([height, 0]);
svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data) {

    var u = svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .text(d => d.value)
        .attr("x", function (d) { return x(d.group); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "#6353AA")
}

// Initialize the plot with the first dataset
update(white);
