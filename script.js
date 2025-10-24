// Sample data
const data = [25, 40, 15, 60, 20];

const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

// Create SVG container
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// X scale
const x = d3.scaleBand()
  .domain(data.map((d, i) => i))
  .range([margin.left, width - margin.right])
  .padding(0.1);

// Y scale
const y = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .nice()
  .range([height - margin.bottom, margin.top]);

// Draw bars
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", (d, i) => x(i))
  .attr("y", d => y(d))
  .attr("height", d => y(0) - y(d))
  .attr("width", x.bandwidth())
  .attr("fill", "steelblue");

// Add X axis
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).tickFormat(i => i + 1));

// Add Y axis
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y));
