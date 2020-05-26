/* --------------------------------------------------------------------------------------------------
File: PhilPopDensity.js
Name: Mingun Cho 
CruzID: mcho23@ucsc.edu
StudentID: 1654724
-----------------------------------------------------------------------------------------------------*/ 

/*eslint-env es6*/
/*eslint-env browser*/
/*eslint no-console: 0*/
/*global d3 */    

// Define width and height
var width = 1360,
    height = 700;

// Define Title
// Reference: Interactive Data Visualization for the Web Ch.10
var title = d3.select("#graph");

// Define SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// References/Resources: https://bl.ocks.org/mbostock/5562380 California Population Density by Mike Bostock
// Create a projection for the path.
// Scale and center have been set according to the coordinates in the json file.
var projection = d3.geoMercator() // Spherical Mercator projection
    .scale([2200])
    .center([117.5,15]);

// Create a path variable for drawing the paths based on the data from json file. 
var path = d3.geoPath()
    .projection(projection); 

// Create a color variable.
var color = d3.scaleThreshold()
    .domain([50,100,200,400,700,1500,10000,20000]) // These domains have been set according to the values in the PopulationDensity.csv.
    .range(d3.schemeOrRd[8]); // Set output range of the colorscheme. 

// Read csv file.
d3.csv("PopulationDensity.csv").then(function(data){
	
    // GEOjson file has been reveresed to fix the winding order.
	// Used this resource: https://observablehq.com/@bumbeishvili/rewind-geojson
	d3.json("Phillipines.json").then(function(json){
		
		// Check if csv and json file have been parsed correctly.
		console.log(data);
		console.log(json);
		console.log(json.features);
		
		// Merge density values into the json file.
		for(var i = 0; i < data.length; i++){
			// Get the name of region
			var regionName = data[i].region;
			
			// Get density value of that region
			var densityValue = parseFloat(data[i].density);
			
			// Go through the json file
			for(var j = 0; j < json.features.length; j++){
                // Get the name of the feature at index j
				var jsonRegion = json.features[j].properties.NAME_1;
				
				// If the names match, then insert the values
				if(regionName == jsonRegion){
					json.features[j].properties.value = densityValue;
					break; // No need to go through the end of the file. So, break out.
				}
			}
		}
		console.log(json.features);
		
		// Draw path 
		// Reference: Interactive Data Visualization for the Web Ch.14 Figure 5 Choropleth
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
            .style("stroke", "black") // black outline path 
            .style("fill", function(d){ // Fill in the color of each region
                var value = d.properties.value; // Get the values that were merged with csv file
                if (value) {
                    //If value exists…
                    return color(value);
                } else {
					//If value is undefined
                    return "#ccc";
                }
            });
		
		});
	
	// Adding legend
	// Reference: https://github.com/wcoatesucsc/data-visualizations/tree/master/DenmarkPopulationDensity
	var legend = svg.append("g")
        .selectAll("g")
        .data(color.range())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i){ // Place the legends
            return "translate(" + 850 + "," + ((i*30) + 40) + ")";
        });
		
    // Add the squares for the legend
	legend.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d) { return d; })
        .style("stroke", color);
		
    // Add the labels for the legend
	legend.append("text")
        .attr("x", 28)
        .attr("y", 16)
        .text(function(d, i){
            var ranges = ["1-50", "51-100", "101-200", "201-400", "401-700", "701-1500", "1501-10000", ">10001"]
            return ranges[i] + "   people/square km";
        });
});

// Display Population_Density()
function Population_Density(){ // eslint-disable-line
	console.log("Population_Density()");
	
	// Remove old svg
	d3.select("svg").remove();
	
	// Define Title
	// Reference: Interactive Data Visualization for the Web Ch.10	
	title.select("#title")
        .text("Phillipines Population Density, 2015");
	
	// Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "auto");

    // References/Resources: https://bl.ocks.org/mbostock/5562380 California Population Density by Mike Bostock
    // Create a projection for the path.
    // Scale and center have been set according to the coordinates in the json file.
	var projection = d3.geoMercator()
        .scale([2200])
        .center([117.5,15]);

    // Create a path variable for drawing the paths based on the data from json file. 
	var path = d3.geoPath()
        .projection(projection);

    // Create a color variable.
	var color = d3.scaleThreshold()
        .domain([50,100,200,400,700,1500,10000,20000]) // These domains have been set according to the values in the PopulationDensity.csv.
        .range(d3.schemeOrRd[8]); // Set output range of the colorscheme. 

    // Read csv file.
	d3.csv("PopulationDensity.csv").then(function(data){
	
        // GEOjson file has been reveresed to fix the winding order.
		// Used this resource: https://observablehq.com/@bumbeishvili/rewind-geojson
		d3.json("Phillipines.json").then(function(json){
			
			// Check if csv and json file have been parsed correctly.
            console.log(data);
			console.log(json);
            console.log(json.features);
		
            // Merge density values into the json file.
            for(var i = 0; i < data.length; i++){
                // Get the name of region
                var regionName = data[i].region;
			
                // Get density value of that region
                var densityValue = parseFloat(data[i].density);
			
                // Go through the json file
                for(var j = 0; j < json.features.length; j++){
                    // Get the name of the feature at index j
                    var jsonRegion = json.features[j].properties.NAME_1;
				
                    // If the names match, then insert the values
                    if(regionName == jsonRegion){
                        json.features[j].properties.value = densityValue;
                        break; // No need to go through the end of the file. So, break out.
                    }
                }
            }
            console.log(json.features);
		
			// Draw path 
            // Reference: Interactive Data Visualization for the Web Ch.14 Figure 5 Choropleth
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "black") // black outline path 
                .style("fill", function(d){ // Fill in the color of each region
                    var value = d.properties.value; // Get the values that were merged with csv file
                    if (value) {
                        //If value exists…
                        return color(value);
                    } else {
                        //If value is undefined
                        return "#ccc";
                    }
                });
		
		});
	
        // Adding legend
        // Reference: https://github.com/wcoatesucsc/data-visualizations/tree/master/DenmarkPopulationDensity
        var legend = svg.append("g")
            .selectAll("g")
            .data(color.range())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i){ // Place the legends
                return "translate(" + 850 + "," + ((i*30) + 40) + ")";
            });
		
		// Add the squares for the legend
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d) { return d; })
            .style("stroke", color);
		
		// Add the labels for the legend
        legend.append("text")
            .attr("x", 28)
            .attr("y", 16)
            .text(function(d, i){
                var ranges = ["1-50", "51-100", "101-200", "201-400", "401-700", "701-1500", "1501-10000", ">10001"]
                return ranges[i] + "   people/square km";
            });
    });
}

// Display Highest_Elevation()
function Highest_Elevation(){ // eslint-disable-line
	console.log("Highest_Elevation()");
	
	// Remove old svg
	d3.select("svg").remove();
	
	// Define Title
	// Reference: Interactive Data Visualization for the Web Ch.10	
	title.select("#title")
        .text("Phillipines Highest Elevation by Region");
	
	// Define SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "auto");

	// References/Resources: https://bl.ocks.org/mbostock/5562380 California Population Density by Mike Bostock
    // Create a projection for the path.
    // Scale and center have been set according to the coordinates in the json file.
    var projection = d3.geoMercator()
        .scale([2200])
        .center([117.5,15]);

    // Create a path variable for drawing the paths based on the data from json file. 
    var path = d3.geoPath()
        .projection(projection);

    // Create a color variable.
    var color = d3.scaleThreshold()
        .domain([50,100,200,400,700,1200,1800,2500]) // These domains have been set according to the values in the HighestElevation.csv.
        .range(d3.schemeGnBu[8]); // Set output range of the colorscheme. 

    // Read csv file.
	d3.csv("HighestElevation.csv").then(function(data){
	
        // GEOjson file has been reveresed to fix the winding order.
		// Used this resource: https://observablehq.com/@bumbeishvili/rewind-geojson
		d3.json("Phillipines.json").then(function(json){
		
			// Check if csv and json file have been parsed correctly.
            console.log(data);
			console.log(json);
            console.log(json.features);
		
            // Merge density values into the json file.
            for(var i = 0; i < data.length; i++){
                // Get the name of region
                var regionName = data[i].region;
			
                // Get density value of that region
                var densityValue = parseFloat(data[i].density);
			
                // Go through the json file
                for(var j = 0; j < json.features.length; j++){
                    // Get the name of the feature at index j
                    var jsonRegion = json.features[j].properties.NAME_1;
				
                    // If the names match, then insert the values
                    if(regionName == jsonRegion){
                        json.features[j].properties.value = densityValue;
                        break; // No need to go through the end of the file. So, break out.
                    }
                }
            }
            console.log(json.features);
		
			// Draw path 
            // Reference: Interactive Data Visualization for the Web Ch.14 Figure 5 Choropleth
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path) 
                .style("stroke", "black") // black outline path 
                .style("fill", function(d){ // Fill in the color of each region
                    var value = d.properties.value; // Get the values that were merged with csv file
                    if (value) {
                        //If value exists…
                        return color(value);
                    } else {
                        //If value is undefined
                        return "#ccc";
                    }
                });
		
		});
	
        // Adding legend
        // Reference: https://github.com/wcoatesucsc/data-visualizations/tree/master/DenmarkPopulationDensity
        var legend = svg.append("g")
            .selectAll("g")
            .data(color.range())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i){ // Place the legends
                return "translate(" + 850 + "," + ((i*30) + 40) + ")";
            });
		
		// Add the squares for the legend
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d) { return d; })
            .style("stroke", color);
		
		// Add the labels for the legend
        legend.append("text")
            .attr("x", 28)
            .attr("y", 16)
            .text(function(d, i){
                var ranges = ["1-50", "51-100", "101-200", "201-400", "401-700", "701-1200", "1201-1800", ">2500"]
                return ranges[i] + "   meters";
            });
    });
	
	
}
