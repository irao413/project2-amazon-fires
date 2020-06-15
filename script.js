new Chart(document.getElementById("mixed-chart"), 
{
    type: 'bar',
    data: {
      labels: ["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
      datasets: [{
          label: "Fires",
          type: "line",
          borderColor: "red",
          data: [728,592,398,184,254,167,259,280,305,221,309,264,372,257,444,688],
          yAxisID: 'left-y-axis'
        }, {
          label: "Deforestation",
          type: "bar",
          backgroundColor: "green",
          data: [1232,775,788,610,604,405,595,502,523,583,500,712,1129,1001,1045,1421],
          yAxisID: 'right-y-axis'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Fires and Deforestation in AC & AM(test)'
      },
      legend: { display: true },
      scales: {
        yAxes: [{
          id: 'left-y-axis',
          type: 'linear',
          position: 'left'
        }, {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right'
  
        }]
      }
    }
});