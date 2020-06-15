// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 100, bottom: 60, left: 100
 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from JSON file
var data_path ="../static/data/cattle_data.json";

d3.json(data_path).then(function(cattleData) {
  console.log(cattleData);
  console.log([cattleData]);

  // Create a function to parse year and time
  var parseTime = d3.timeParse("%Y");

  // Format the data
  cattleData.forEach(function(data) {
    data.year = parseTime(data.year);
    data.cattle = +data.cattle;
    data.cow_milk = +data.cow_milk;
  });

  // Create scaling functions
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(cattleData, d => d.year))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(cattleData, d => d.cattle)])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(cattleData, d => d.cow_milk)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xTimeScale)
    .tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d.cattle));

  var line2 = d3.line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d.cow_milk));

  // Append a path for line1
  chartGroup.append("path")
    .data([cattleData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([cattleData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("dow-text text", true)
    .text("Number of Cattle in Brazil by Year (Heads)");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .classed("smurf-text text", true)
    .text("Cow's Milk Production in Brazil by Year (Thousand Liters)");
}).catch(function(error) {
  console.log(error);
});
