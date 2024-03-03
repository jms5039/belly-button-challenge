# Belly Button Biodiversity Dashboard 🧫📊

![Dashboard Preview](dashboard_preview.png)

## Background 🌍🔬

The Belly Button Biodiversity dashboard is an interactive exploration tool 🛠️ designed to explore the diverse microbial species—operational taxonomic units (OTUs)—that colonize human navels. Utilizing data from the Belly Button Biodiversity dataset, this project showcases how a small number of microbial species are prevalent in the majority of people, while others are more rare.

## Detailed Project Instructions 📝✨

### 1. Data Retrieval and Parsing 📡📊
- **Objective**: Use the D3.js library to programmatically read the `samples.json` file.
- **Action Items**:
  - Incorporate the D3.js library into your HTML file 📄.
  - Use D3.js to fetch the data from the URL: [samples.json dataset](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).
  - Parse the fetched data to prepare it for visualization 📈.

### 2. Bar Chart Creation 📊
- **Objective**: Generate a horizontal bar chart to display the top 10 OTUs found in the selected individual 📉.
- **Action Items**:
  - **Values**: Extract the `sample_values` as the magnitude of the bars.
  - **Labels**: Use `otu_ids` as the labels for the x-axis.
  - **Hovertext**: Implement `otu_labels` for detailed information on hover.

### 3. Bubble Chart Implementation 🔵
- **Objective**: Create a bubble chart that represents each sample's microbial composition.
- **Action Items**:
  - **X Values**: Position each OTU along the x-axis using `otu_ids`.
  - **Y Values**: Use `sample_values` for the y-axis positioning.
  - **Marker Size**: Scale the marker size based on `sample_values`.
  - **Marker Colors**: Assign colors based on `otu_ids`.
  - **Text Values**: Display `otu_labels` as text annotations for each bubble.

### 4. Displaying Demographic Information 👤📊
- **Objective**: Exhibit the selected individual's demographic information.
- **Action Items**:
  - Parse the `metadata` section of the dataset to extract demographic information.
  - Display each key-value pair in a designated area on the dashboard.

### 5. Dynamic Updates 🔄
- **Objective**: Ensure that all visualizations and displayed data update when a new sample is selected.
- **Action Items**:
  - Implement event handlers to detect changes in the selected sample.
  - Redraw the charts and update demographic information based on the new selection.

### 6. Deployment 🚀🌐
- **Objective**: Deploy your interactive dashboard to a public platform.
- **Action Items**:
  - Utilize GitHub Pages or a similar service to host your dashboard.
  - Ensure the deployed site is accessible and functions as expected.

## Advanced Challenge (Optional) 🚀🔧
- **Objective**: Incorporate a gauge chart to represent the weekly washing frequency of the selected individual.
- **Adaptation Guide**:
  - Follow the Plotly Gauge Charts documentation to customize the gauge chart for values ranging from 0 to 9.
  - Update the gauge chart dynamically with each new sample selection.

## Hints 💡🔍
- Employ `console.log` at various stages of your JavaScript code to examine the data structure and debug your application.

## Deployment Links 🔗💻
- [Dashboard Deployment](#) (Link to your deployed dashboard)
- [GitHub Repository](#) (Link to your GitHub repository)
---
