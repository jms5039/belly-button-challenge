// Fetch the JSON data and console log it
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  console.log(data);

  // Populate the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  data.names.forEach(function(name) {
    dropdownMenu.append("option").text(name).property("value", name);
  });

  // Initialize the page with the first sample's data
  optionChanged(data.names[0]);
});

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    updateCharts(data, newSample);
    updateMetadata(data, newSample);
  });
}

function updateCharts(data, sample) {
  // Filter the data for the selected sample number
  var sampleData = data.samples.filter(sampleObj => sampleObj.id === sample)[0];
  var otu_ids = sampleData.otu_ids;
  var sample_values = sampleData.sample_values;
  var otu_labels = sampleData.otu_labels;

  // Update bar chart
  var barData = [{
    y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    x: sample_values.slice(0, 10).reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h'
  }];

  var barLayout = {
    title: "Top 10 OTUs Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot('bar', barData, barLayout);

  // Update bubble chart
  var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  }];

  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30}
  };

  Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

function updateMetadata(data, sample) {
  // Filter the data for the selected sample's metadata
  var metadata = data.metadata.filter(sampleObj => sampleObj.id == sample)[0];
  var metadataPanel = d3.select("#sample-metadata");
  
  // Clear any existing metadata
  metadataPanel.html("");

  // Add each key-value pair to the metadata panel
  Object.entries(metadata).forEach(([key, value]) => {
    metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    if(key === 'wfreq') {
      updateGaugeChart(value); // Update the gauge chart with the washing frequency
    }
  });
}

// Function to update the gauge chart
function updateGaugeChart(wfreq) {
  // If wfreq is null or undefined, wfreq will be set to 0
  wfreq = wfreq || 0;

  // Calculate the angle for the gauge needle
  var level = parseFloat(wfreq) * 20; // Multiply by 20 to get the degrees (180 degrees in half a circle)

  // Trig to calc meter point
  var degrees = 180 - level,
      radius = 0.5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'Washing Frequency',
      text: 'Washing Frequency: ${wfreq}', // Display wfreq in hover text
      hoverinfo: 'text'
    },
    {
      values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: [
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(240, 230, 215, .5)', 'rgba(247, 242, 236, .5)',
          'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'
        ]
      },
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      hoverinfo: 'text',
      hole: .5,
      type: 'pie',
      showlegend: false
    }
  ];

  var layout = {
    shapes: [{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
    title: 'Belly Button Washing Frequency<br>Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
    yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] }
  };

  Plotly.newPlot('gauge', data, layout);
}
