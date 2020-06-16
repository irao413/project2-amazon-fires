Chart.plugins.register({
    beforeDraw: function(chartInstance) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
  });
  
  new Chart(document.getElementById("mixed-chart"), 
  {
      type: 'bar',
      data: {
        labels: ["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
        datasets: [{
            label: "Total Fires",
            type: "line",
            borderColor: "red",
            backgroundColor: "rgba(200,10,36,0.4)",
            data: [218637,213720,144422,186480,103453,81682,134614,58186,86719,58688,82554,106438,87761,107439,68345,88135],
            yAxisID: 'left-y-axis'
          }, {
            label: "Total Deforestation",
            type: "line",
            borderColor: "lightGreen",
            backgroundColor: "rgba(0,100,0,0.80)",
            data: [138860,95070,71430,58255,64555,37320,35000,32090,22855,29455,25060,31035,39465,34735,37680,48810],
            yAxisID: 'right-y-axis'
          }, {
            label: "CO2 emissions",
            type: "line",
            borderColor: "orange",
            backgroundColor: "rgba(255,140,0,0.6)",
            data: [45900,46650,46200,47750,50475,47350,53625,53625,55625,58975,62625,65325],
            yAxisID: 'right-y-axis'
          }, {
            label: "GDP",
            type: "line",
            borderColor: "lightBlue",
            backgroundColor: "rgba(30,144,255,0.8)",
            data: [16725,22275,27700,34925,42400,41675,55225,65400,61625,61825,61400,45050,44900,51575,47125],
            yAxisID: 'left-y-axis'
          }, {
            label: "Beef Exports",
            type: "line",
            borderColor: "lightYellow",
            backgroundColor: "rgba(255,215,0,0.8)",
            data: [11748,13546,15203,16096,13779,12293,10960,12404,15032,15345,13549,13510,14790,16430],
            yAxisID: 'right-y-axis'
          }
        ]
      },
      options: {
        scaleFontColor: 'white',
        responsive: true,
        tooltips: {
          mode: 'single',
        },
        title: {
          display: true,
          fontSize : 22,
          fontColor: "white",
          text: 'Fires, Deforestation, CO2 Emissions, GDP & Beef Exports in Brazil'
        },
        legend: { display: true },
        scales: {
          yAxes: [{
            scaleLabel: {
              display:true,
              fontColor: "white",
              fontSize : 20,
              fontColor: "white",
              labelString: "Fire Count & GDP"
            } , 
            id: 'left-y-axis',
            type: 'linear',
            position: 'left'
            
          }, {
            scaleLabel: {
              display:true,
              fontSize : 20,
              fontColor: "white",
              labelString: "Deforestation, CO2 Emissions, Beef Exports"
            },
            id: 'right-y-axis',
            type: 'linear',
            position: 'right',
          }]
        }
      }
  });