/**
 * @typedef {scales} Scale
 */

var chartData = {
	labels: ["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
	datasets: [{
                type: 'line',
                label: 'Acre Fires',
                data: [7271,15993,6198,8549,5699,3511,8661,3191,4720,4980,4398,5779,7684,6295,6626,6802],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
			}, {
				type: 'bar',
				label: 'Acre Deforestation',
                data: [728,592,398,184,254,167,259,280,305,221,309,264,372,257,444,688],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
			}, {
				type: 'line',
                label: 'Amapa Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Amapa Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Amazonas Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Amazonas Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Maranhao Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Maranhao Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, { 
                type: 'line',
                label: 'Mato Grosso Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Mato Grosso Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Para Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Para Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Rondonia Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Rondonia Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Roraima Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Roraima Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }, {
                type: 'line',
                label: 'Tocantins Fires',
                data: [],
                borderWidth: 1,
                borderColor: 'red',
				fill: false,
                // yAxisID = 'left-y-axis'
            }, {
                type: 'bar',
				label: 'Tocantines Deforestation',
                data: [],
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: "green",
                fill: true,
                // yAxisID = 'right-y-axis'
            }
        ]
        }
        
        // ,

        // options:
        //     Scale: {
        //         yAxes: [{
        //             id: "left-y-axis",
        //             type: "linear",
        //             position: "left",
        //         }, {
        //             id: "right-y-axis",
        //             type: "linear",
        //             position: "right",
        //             ticks: {
        //                 max: 1,
        //                 min: 0
        //             }
        //         }]
        //     }
        
        
		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myMixedChart = new Chart(ctx, {
				type: 'bar',
				data: chartData,
				options: {
					responsive: true,
					title: {
						display: true,
						text: 'Brazil Fires and Deforestation'
					},
					tooltips: {
						mode: 'index',
						intersect: true
					}
				}
			});
		};	