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
          label: "Acre Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [7271,15993,6198,8549,5699,3511,8661,3191,4720,4980,4398,5779,7684,6295,6626,6802],
          yAxisID: 'left-y-axis'
        }, {
          label: "Acre Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [728,592,398,184,254,167,259,280,305,221,309,264,372,257,444,688],
          yAxisID: 'right-y-axis'
        },{
          label: "Amazonas Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [8083,15644,11697,11293,6701,9280,12139,5028,9114,6512,9008,13419,11173,11685,11446,12665],
          yAxisID: 'left-y-axis'
        }, {
          label: "Amazonas Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [1232,775,788,610,604,405,595,502,523,583,500,712,1129,1001,1045,1421],
          yAxisID: 'right-y-axis'
        }, {
          label: "Amapa Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [3413,2020,1665,1484,2153,2456,1000,1396,2518,1529,1848,2936,2595,1946,1206,1272],
          yAxisID: 'left-y-axis'
        }, {
          label: "Amapa Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [46,33,30,39,100,70,53,66,27,23,31,25,17,24,24,8],
          yAxisID: 'right-y-axis'
        }, {
          label: "Maranhao Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [11443,10820,7885,12329,7822,6664,7298,4976,6919,4418,5733,7475,4928,5896,2449,3989],
          yAxisID: 'left-y-axis'
        }, {
          label: "Maranhao Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [755,922,674,631,1271,828,712,396,269,403,257,209,258,265,253,215],
          yAxisID: 'right-y-axis'
        }, {
          label: "Mato Grosso Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [70422,53489,32745,52399,18602,9970,28362,9103,16133,10830,15677,17599,15836,18143,11621,17479],
          yAxisID: 'left-y-axis'
        }, {
          label: "Mato Grosso Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [11814,7145,4333,2678,3258,1049,871,1120,757,1139,1075,1601,1489,1561,1490,1685],
          yAxisID: 'right-y-axis'
        }, {
          label: "Para Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [74214,71477,55840,68491,48449,41664,57196,26563,37221,24046,35526,43164,29724,49770,22080,29700],
          yAxisID: 'left-y-axis'
        }, {
          label: "Para Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [8870,5899,5659,5526,5607,4281,3770,3008,1741,2346,1887,2153,2992,2433,2744,3862],
          yAxisID: 'right-y-axis'
        }, {
          label: "Rondonia Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [40824,41641,25699,27477,11549,5396,16924,6078,8312,4613,7327,13105,11462,11298,10253,11206],
          yAxisID: 'left-y-axis'
        }, {
          label: "Rondonia Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [3858,3244,2049,1611,1136,482,435,865,773,932,684,1030,1376,1243,1316,1245],
          yAxisID: 'right-y-axis'
        }, {
          label: "Roraima Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [2221,1461,2189,3244,1950,2359,1918,1475,1376,1395,2519,2452,3870,1565,2383,4775],
          yAxisID: 'left-y-axis'
        }, {
          label: "Roraima Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [311,133,231,309,574,121,256,141,124,170,219,156,202,132,195,617],
          yAxisID: 'right-y-axis'
        }, {
          label: "Tocantins Fires",
          type: "line",
          borderColor: "red",
          fill: false,
          data: [746,1175,504,1214,528,382,1116,376,406,365,518,509,489,841,281,247],
          yAxisID: 'left-y-axis'
        }, {
          label: "Tocantins Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [158,271,124,63,107,61,49,40,52,74,50,57,58,31,25,21],
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
        fontSize : 30,
        fontColor: "white",
        text: 'Fires and Deforestation in Brazilian Amazon'
      },
      legend: { display: true },
      scales: {
        yAxes: [{
          scaleLabel: {
            display:true,
            fontColor: "white",
            fontSize : 20,
            fontColor: "white",
            labelString: "Fire Count (sum)"
          } , 
          id: 'left-y-axis',
          type: 'linear',
          position: 'left'
          
        }, {
          scaleLabel: {
            display:true,
            fontSize : 20,
            fontColor: "white",
            labelString: "Deforestation (km^2)"
          },
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
        }]
      }
    }
});