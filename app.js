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
  });
}
