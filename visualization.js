// Load CSV file
d3.csv("v7_Latest_Data_Science_Salaries.csv").then(function(data) {
    // Convert string to numbers
    data.forEach(function(d) {
      d['Salary in USD'] = +d['Salary in USD'];
    });

    // Group data by experience level
    const groupedData = d3.group(data, d => d['Experience Level']);

    // Calculate median and mean salary for each experience level
    const medianMeanData = Array.from(groupedData, ([key, value]) => ({
      'Experience Level': key,
      'Median Salary': d3.median(value, d => d['Salary in USD']),
      'Mean Salary': d3.mean(value, d => d['Salary in USD'])
    }));

    // Define SVG dimensions and margins
    const width = 1100;
    const height = 650;
    const margin = { top: 70, right: 120, bottom:80, left: 100 };

    // Create SVG element
    const svg = d3.select("#visualization")
      .attr("width", width)
      .attr("height", height);

    // Define scales for x-axis and y-axis
    const xScale = d3.scaleBand()
      .domain(medianMeanData.map(d => d['Experience Level']))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(medianMeanData, d => Math.max(d['Median Salary'], d['Mean Salary']))])
      .range([height - margin.bottom, margin.top]);

    // Draw bars for median salary
    svg.selectAll(".median-bar")
      .data(medianMeanData)
      .enter()
      .append("rect")
      .attr("class", "median-bar")
      .attr("x", d => xScale(d['Experience Level']))
      .attr("y", d => yScale(d['Median Salary']))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - yScale(d['Median Salary']))
      .attr("fill", "steelblue");

    // Draw bars for mean salary
    svg.selectAll(".mean-bar")
      .data(medianMeanData)
      .enter()
      .append("rect")
      .attr("class", "mean-bar")
      .attr("x", d => xScale(d['Experience Level']) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d['Mean Salary']))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - yScale(d['Mean Salary']))
      .attr("fill", "orange");

    // Draw legend
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - margin.right},${margin.top})`);

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "steelblue");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text("Median");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "orange");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 30)
      .text("Mean");

    // Add data labels for median salary
    svg.selectAll(".median-data-label")
      .data(medianMeanData)
      .enter()
      .append("text")
      .attr("class", "median-data-label")
      .attr("x", d => xScale(d['Experience Level']) + xScale.bandwidth() / 4)
      .attr("y", d => yScale(d['Median Salary']) - 5)
      .attr("text-anchor", "middle")
      .text(d => d3.format("$.2f")(d['Median Salary']));

    // Add data labels for mean salary
    svg.selectAll(".mean-data-label")
      .data(medianMeanData)
      .enter()
      .append("text")
      .attr("class", "mean-data-label")
      .attr("x", d => xScale(d['Experience Level']) + 3 * xScale.bandwidth() / 4)
      .attr("y", d => yScale(d['Mean Salary']) - 5)
      .attr("text-anchor", "middle")
      .text(d => d3.format("$.2f")(d['Mean Salary']));

    // Draw x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Draw y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 2)
      .attr("text-anchor", "middle")
      .text("Experience Level");

    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", margin.left / 2)
      .attr("text-anchor", "middle")
      .text("Salary in USD");

  // Append title to the SVG
      svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", (margin.top))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Median and Mean Salaries by Experience Level");
});
