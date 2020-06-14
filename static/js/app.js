// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the JSON response from Flask
// =================================
var url ="../static/data/cattle_data.json";

d3.json(url).then(function(cattleData) {
  // Step 4: Parse the data
  // Format the data and convert to numerical and year values
  // =================================
  // Create a function to parse year and time
  var parseTime = d3.timeParse("%Y");

  // Format the data
  cattleData.forEach(function(data) {
    data.year = parseTime(data.year);
    data.cattle = +data.cattle;
    data.cow_milk = +data.cow_milk;
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(cattleData, d => d.year))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the cattle data
  var cattleMax = d3.max(cattleData, d => d.cattle);

  // find the max of the cow_milk data
  var cow_milkMax = d3.max(cattleData, d => d.cow_milk);

  var yMax;
  if (cattleMax > cow_milkMax) {
    yMax = cattleMax;
  }
  else {
    yMax = cow_milkMax;
  }

  // var yMax = cattleMax > cow_milkMax ? cattleMax : cow_milkMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for cattle data
  var line1 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.cattle));

  // Line generator for cow_milk data
  var line2 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale(d.cow_milk));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(cattleData))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([cattleData])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);

}).catch(function(error) {
  console.log(error);
});
