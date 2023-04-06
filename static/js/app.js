const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    let samples = data.samples;
    let metadata = data.metadata;
    let top10 = [];
    let topOTUString = [];
    let topLabels = [];
    let allVal = [];
    let allOTU = [];
    let allLabels = [];
    let metaStrings = [];
    // set name to first element in list for webpage initialization
    let name = data.names[0];

    // loop through samples to find name
    for (sample of samples) {
        if (sample["id"] == name) {
            // push all sample_values, otu_ids, and otu_labels to respective lists for bubble chart
            for (let i = 0; i < sample.sample_values.length; i++) {
                allVal.push(sample.sample_values[i]);
                allOTU.push(sample.otu_ids[i]);
                allLabels.push(sample.otu_labels[i]);
            }
            // push first 10 items to respective lists for bar chart
            if (sample.sample_values.length >= 10) {
                for (let i = 0; i < 10; i++) {
                    top10.push(sample.sample_values[i]);
                    // convert otu_ids to strings for Plotly output (otherwise they would be sorted as integers)
                    topOTUString.push(`OTU ${sample.otu_ids[i].toString()}`);
                    topLabels.push(sample.otu_labels[i]);
                }
            }
            // if less than 10 items we can use the previously generated lists
            else {
                top10 = allVal;
                topLabels = allLabels;
                for (let i = 0; i < sample.sample_values.length; i++) {
                    // string conversion still necessary
                    topOTUString.push(`OTU ${sample.otu_ids[i].toString()}`);
                }
            }

            // trace for horizonatal bar chart
            let trace1 = {
                // pushing the elements into a list reverses their order, so .reverse() will give the original order (lists started out sorted)
                x: top10.reverse(),
                y: topOTUString.reverse(),
                text: topLabels.reverse(),
                type: "bar",
                orientation: "h"
            };
            let traces1 = [trace1];
            let layout1 = {
                title: `Top 10 OTUs for Subject ${name}`,
            };
            Plotly.newPlot("bar",traces1,layout1);

            // trace for bubble chart
            let trace2 = {
                x: allOTU,
                y: allVal,
                text: allLabels,
                mode: "markers",
                marker: {
                    size: allVal,
                    color: allOTU,
                    colorscale: "Viridis"
                },
            };
            let traces2 = [trace2];
            let layout2 = {
                height: 600,
                width: 1500,
                xaxis: {
                    title: {
                        text: "OTU ID"
                    }
                }
            };
            Plotly.newPlot("bubble",traces2,layout2);
        }
    }

    // loop through metadata to find match with name 
    for (meta of metadata) {
        if (meta["id"] == name) {
            // extract each `key: value` pair and push to list metaStrings
            Object.entries(meta).forEach(([key, value]) => {
                metaStrings.push(`${key}: ${value}`);
            });
            // use metaStrings to build output string for html file
            let metaString = `${metaStrings[0]}<br/>${metaStrings[1]}<br/>${metaStrings[2]}<br/>${metaStrings[3]}<br/>${metaStrings[4]}<br/>${metaStrings[5]}<br/>${metaStrings[6]}`;
            // push output string to html file using innerHTML
            document.getElementById("sample-metadata").innerHTML = metaString;
        }
    }
});

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let name = dropdownMenu.property("value");

    // run the same code as our webpage initialization but this time with "value" selected from dropdownMenu
    d3.json(url).then(function(data) {
        let samples = data.samples;
        let metadata = data.metadata;
        let top10 = [];
        let topOTUString = [];
        let topLabels = [];
        let allVal = [];
        let allOTU = [];
        let allLabels = [];
        let metaStrings = [];

        // loop through samples to find name
        for (sample of samples) {
            if (sample["id"] == name) {
                // push all sample_values, otu_ids, and otu_labels to respective lists for bubble chart
                for (let i = 0; i < sample.sample_values.length; i++) {
                    allVal.push(sample.sample_values[i]);
                    allOTU.push(sample.otu_ids[i]);
                    allLabels.push(sample.otu_labels[i]);
                }
                // push first 10 items to respective lists for bar chart
                if (sample.sample_values.length >= 10) {
                    for (let i = 0; i < 10; i++) {
                        top10.push(sample.sample_values[i]);
                        // convert otu_ids to strings for Plotly output (otherwise they would be sorted as integers)
                        topOTUString.push(`OTU ${sample.otu_ids[i].toString()}`);
                        topLabels.push(sample.otu_labels[i]);
                    }
                }
                // if less than 10 items we can use the previously generated lists
                else {
                    top10 = allVal;
                    topLabels = allLabels;
                    for (let i = 0; i < sample.sample_values.length; i++) {
                        // string conversion still necessary
                        topOTUString.push(`OTU ${sample.otu_ids[i].toString()}`);
                    }
                }

                // trace for horizonatal bar chart
                let trace1 = {
                    // pushing the elements into a list reverses their order, so .reverse() will give the original order (lists started out sorted)
                    x: top10.reverse(),
                    y: topOTUString.reverse(),
                    text: topLabels.reverse(),
                    type: "bar",
                    orientation: "h"
                };
                let traces = [trace1];
                let layout = {
                    title: `Top 10 OTUs for Subject ${name}`,
                };
                Plotly.newPlot("bar",traces,layout);

                // trace for bubble chart
                let trace2 = {
                    x: allOTU,
                    y: allVal,
                    text: allLabels,
                    mode: "markers",
                    marker: {
                        size: allVal,
                        color: allOTU,
                        colorscale: "Viridis"
                    },
                };
                let traces2 = [trace2];
                let layout2 = {
                    height: 600,
                    width: 1500,
                    xaxis: {
                        title: {
                            text: "OTU ID"
                        }
                    }
                };
                Plotly.newPlot("bubble",traces2,layout2);
            }
        }
        
        // loop through metadata to find match with name 
        for (meta of metadata) {
            if (meta["id"] == name) {
                // extract each `key: value` pair and push to list metaStrings
                Object.entries(meta).forEach(([key, value]) => {
                    metaStrings.push(`${key}: ${value}`);
                });
                // use metaStrings to build output string for html file
                let metaString = `${metaStrings[0]}<br/>${metaStrings[1]}<br/>${metaStrings[2]}<br/>${metaStrings[3]}<br/>${metaStrings[4]}<br/>${metaStrings[5]}<br/>${metaStrings[6]}`;
                // push output string to html file using innerHTML
                document.getElementById("sample-metadata").innerHTML = metaString;
            }
        }
    });
}