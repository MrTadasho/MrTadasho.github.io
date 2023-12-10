const ctx = document.getElementById('myChart2');
const ctx2 = document.getElementById('myChart');

const pointImage = new Image(20, 20)
pointImage.src = './image/Icon_Bact_1.png'
const pointImage2 = new Image(20, 20)
pointImage2.src = './image/Icon_Bact_2.png'
const pointImage3 = new Image(20, 20)
pointImage3.src = './image/Icon_Bact_3.png'
console.log(window.innerHeight);
console.log(window.innerWidth);


var chart1 = new Chart(ctx2, {
	type: 'scatter',
    data: {
		datasets: [{
        label: 'Bactérie 1',
        data: [{
			    x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 0.5,
                y: 5.5
            }],
            backgroundColor: 'rgb(255, 99, 132)',
            pointHitRadius: 15
        },{
        label: 'Bactérie 2',
        data: [{
			    x: -20,
                y: 1
            }, {
                x: 0,
                y: 30
            }, {
                x: 17,
                y: 2
            }, {
                x: 7,
                y: 8
            }],
            backgroundColor: 'rgb(99, 200, 165)',
            pointHitRadius: 15,
			pointStyle: pointImage2
        },{
        label: 'Bactérie 3',
        data: [{
			    x: 20,
                y: 14
            }, {
                x: 30,
                y: 30
            }, {
                x: 47,
                y: 2
            }, {
                x: 87,
                y: 4
            }],
            backgroundColor: 'rgb(112, 87, 255)',
            pointHitRadius: 15,
			pointStyle: pointImage3
        }],
      },
        options: {
        elements: {
            point: {
            pointStyle: pointImage
          }
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false
            },
            type: 'linear',
            position: 'bottom'
          },
          y: {
            beginAtZero: true,
            grid: {
              drawOnChartArea: false
            }
          }
        },
		animation: false
      }
    });

var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          label: 'Bacterie 1',
          data: [2, 3, 5, 10, 10, 7, 5],
          borderColor: 'rgb(255,99,132)',
          backgroundColor: 'rgb(255,99,132)',
          tension:0.1
        }, {
          label: 'Bacterie 2',
          data: [4, 6, 10, 10, 8, 5, 2],
          borderColor: 'rgb(99,200,165)',
          backgroundColor: 'rgb(99,200,165)',
          tension:0.1
        }, {
          label: 'Bacterie 3',
          data: [1, 2, 5, 9, 9, 5, 4],
          borderColor: 'rgb(112,87,255)',
          backgroundColor: 'rgb(112,87,255)',
          tension:0.1
        }]
      },
      options: {
        // Additional options for the chart
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
	
	function addData(chart, label, x, y, num) {
    if (!chart.data.datasets) {
        chart.data.datasets = [];
    }
    const labelIndex = chart.data.labels.indexOf(label);
    const numericX = Number(x);
    const numericY = Number(y);

    if (!isNaN(numericX) && !isNaN(numericY)) {
        const dataPoint = { x: numericX, y: numericY };

        if (labelIndex !== -1) {
			chart.data.labels.push(label);
            chart.data.datasets[num].data.push(dataPoint);
            ;
        } else {
            chart.data.labels.push(label);
            chart.data.datasets[num].data.push(dataPoint);
            ;
        }

        chart.update();
    } else {
        console.error('Invalid x or y coordinate. Please provide numerical values.');
    }
}



function removeData(chart) {
    chart.data.labels = [];

    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    chart.update();
}


function NewBact(posx, posy, vie, mort, muta) {
  const Bact = {
    posx: posx,
    posy: posy,
    vie: vie,
    mort: mort,
	muta: muta,
    deplace: function() {
		const dx= (-1)**rdmint(100);
		const dy= (-1)**rdmint(100);
		this.posx=this.posx+dx;
		this.posy=this.posy+dy;
    }
  };
  return Bact;
}