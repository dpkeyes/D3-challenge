// Create crate for visual
var svgWidth = 960;
var svgHeight = 500;

// Define margin parameter 
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define width and height to be used for scatter plot axes
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG variable
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group and transform it so that it fits within the margins
var chart = svg.append("g")
               .attr("transform", `translate(${width}, ${height})`);

// Import the data and then build the scatterplot
d3.csv("../data/data.csv")
  .then(function(data) {

    // Make sure all numerical data is actually numerical and not strings
    data.forEach(function(d) {
        d.poverty = parseFloat(d.poverty);
        d.povertyMoe = parseFloat(d.povertyMoe);
        d.age = parseFloat(d.age);
        d.ageMoe = parseFloat(d.ageMoe);
        d.income = int(d.income);
        d.incomeMoe = int(d.incomeMoe);
        d.healthcare = parseFloat(d.healthcare);
        d.healthcareLow = parseFloat(d.healthcareLow);
        d.healthcareHigh = parseFloat(d.healthcareHigh);
        d.obesity = parseFloat(d.obesity);
        d.obesityLow = parseFloat(d.obesityLow);
        d.obesityHigh = parseFloat(d.obesityHigh);
        d.smokes = parseFloat(d.smokes);
        d.smokesLow = parseFloat(d.smokesLow);
        d.smokesHigh = parseFloat(d.smokesHigh);
    });

    // Create scale variables for the x and y axes comparing smoking vs. poverty
    xScale = d3.scaleLinear()
               .domain(d3.extent(data, d => d.smokes))
               .range([0, width]);
    
    yScale = d3.scaleLinear()
               .domain(d3.extent(data, d => d.poverty))
               .range([height, 0]);
    
    // Create axis variables
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Add these axes to the SVG group defined above this data function
    chart.append("g")
         .call("yAxis");

    chart.append("g")
         .attr("transform", `translate(0,${height})`)
         .call("xAxis");
    
    // Create circles (or dots) for each data point on the chart
    var circlesGroup = chart.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr("cx", d => xScale(d.smokes))
                            .attr("cy", d => yScale(d.poverty))
                            .attr("r", "15")
                            .attr("fill", "#4CC4B7")
                            .attr("opacity", ".5");

    // 

  });

