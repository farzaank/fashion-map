// Load and process the data
d3.csv("dataviza2.csv").then(function (data) {
	// Dimensions and margins of the graph
	const margin = { top: 10, right: 30, bottom: 30, left: 60 },
		width = 800 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// Append the svg object to the body of the page
	const svg = d3
		.select("svg")
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// Reshape the data
	let reshapedData = [];
	data.forEach((d) => {
		for (let year = 2019; year <= 2023; year++) {
			reshapedData.push({
				name: d.name,
				year: year,
				value: +d[year + " s1"],
			});
		}
	});

	// Group the data by name
	let groupedData = d3.group(reshapedData, (d) => d.name);

	// Color scale
	const color = d3
		.scaleOrdinal()
		.domain(groupedData.keys())
		.range(d3.schemeCategory10);

	// X scale and axis
	const x = d3.scaleLinear().domain([2019, 2023]).range([0, width]);
	svg
		.append("g")
		.attr("transform", `translate(0,${height})`)
		.call(d3.axisBottom(x).tickFormat(d3.format("d")));

	// Y scale and axis
	const y = d3
		.scaleLinear()
		.domain([0, d3.max(reshapedData, (d) => d.value)])
		.range([height, 0]);
	svg.append("g").call(d3.axisLeft(y));

	// Line generator
	const line = d3
		.line()
		.x((d) => x(d.year))
		.y((d) => y(d.value));

	// Draw the lines
	svg
		.selectAll(".line")
		.data(groupedData)
		.enter()
		.append("path")
		.attr("class", "line")
		.attr("d", (d) => line(d[1]))
		.attr("fill", "none")
		.attr("stroke", (d) => color(d[0]))
		.attr("stroke-width", 1.5)
		.on("mouseover", function (event, d) {
			tooltip.transition().duration(200).style("opacity", 1);
			tooltip
				.html(d[0]) // Displaying the name on the tooltip
				.style("left", event.pageX + "px")
				.style("top", event.pageY + "px");
		})
		.on("mousemove", function (event, d) {
			tooltip
				.style("left", event.pageX + "px")
				.style("top", event.pageY + "px");
		})
		.on("mouseout", function (d) {
			tooltip.transition().duration(500).style("opacity", 0);
		});

	// Tooltip
	const tooltip = d3
		.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("background-color", "white")
		.style("border", "solid")
		.style("border-width", "2px")
		.style("border-radius", "5px")
		.style("padding", "5px")
		.style("position", "absolute");
});
