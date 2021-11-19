const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const PDFDocument = require ('pdfkit');

const width = 400; //px
const height = 400; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

(async () => {
    const configuration = {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Users',
          data: [50, 60, 70, 180],
          pointBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          pointBorderColor: 'rgb(0, 200, 0)',
          pointBorderWidth: 3,
          pointStyle: 'circle',
          pointRadius: 10,
          borderWidth: 7,
          borderColor: 'rgb(0, 200, 0)'
        }],
        
      },
      options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(0, 300, 0)'
                }
            }
        },
        scales: {
          x: {
            // eixos de fons
            grid: {
              borderColor: 'rgb(0, 200, 0)',  // linia base de grid
              tickColor: 'blue',  // linia adjunta de cada valor de l'eix
              color: 'yellow'  // grid de columnes
            },
            // title: text de la magnitug de l'eix
            title: {
              color: 'red',
              display: true,
              text: 'Month',
              font: {
                family: 'Arial',
                size: 20
              }
            },
            // ticks: texts de cada valor de l'eix
            ticks: {
              display: true,
              color: 'rgb(200, 0, 0)',
              font: {
                family: 'Arial',
                size: 40
              }
            }
          }
        }
      }
    };
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    // Write image to file
    fs.writeFileSync('./mychart.png', imageBuffer);

    // PDF:
    const doc = new PDFDocument({
      autoFirstPage: false
    })
    doc.pipe(fs.createWriteStream(`./mychart.pdf`));
    doc.addPage({
      size: 'A4',
      layout: 'portrait'
    });
    doc.image(`./mychart.png`, 100, 70, {fit: [300,300]});
    doc.end();



})();


/*
const fs = require('fs');
const { CanvasRenderService } = require('chartjs-node-canvas');

const width = 400; //px
const height = 400; //px
const canvasRenderService = new CanvasRenderService(width, height);

(async () => {
    const configuration = {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Users',
          data: [50, 60, 70, 180]
        }]
      }
    };

    const imageBuffer = await canvasRenderService.renderToBuffer(configuration);

    // Write image to file
    fs.writeFileSync('/tmp/mychart.png', imageBuffer);
})();
*/