/*
   Filename: AdvancedDataVisualization.js

   Content: This code is an advanced data visualization example
            that uses D3.js and creates an interactive scatter plot.

   Description: 
   - The code uses D3.js to fetch data from an API and parse it.
   - It then creates an SVG container and renders an XY scatter plot.
   - It also adds interactive features like tooltips and zooming.
   - The scatter plot represents a dataset of two numerical variables.
   - The code allows customization of colors, axes, and various styles.

   Note: For this code to execute, D3.js library should be included.

   Author: AI Assistant
   Date: September 2021
*/

// Global variables
let dataset; // Holds the loaded dataset
let width, height; // Dimensions of the SVG container
let xScale, yScale; // Scales for the X and Y axes

// Function to fetch data from API
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    dataset = await response.json();
    processData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to process the fetched data
function processData() {
  // Data parsing and manipulation logic here
  // e.g., dataset = dataset.filter(...)
  createScatterPlot();
}

// Function to create scatter plot
function createScatterPlot() {
  // SVG container dimensions
  width = 800;
  height = 500;

  // Create SVG container
  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Scales for X and Y axes
  xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.x)])
    .range([50, width - 50]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.y)])
    .range([height - 50, 50]);

  // Create circles representing data points
  const circles = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 5)
    .attr('fill', 'steelblue');

  // Add tooltips on hover
  circles.append('title')
    .text(d => `(${d.x}, ${d.y})`);

  // Add axes
  const xAxis = d3.axisBottom(xScale);
  svg.append('g')
    .attr('transform', `translate(0, ${height - 50})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  // Add zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .translateExtent([[50, 50], [width - 50, height - 50]])
    .on('zoom', zoomed);

  function zoomed() {
    svg.selectAll('circle')
      .attr('transform', d3.event.transform);
    svg.select('.x-axis').call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
    svg.select('.y-axis').call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
  }

  svg.call(zoom);
}

// Initial code execution
fetchData();