import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loggedInUserName: string = '';
  entityList: any;


  constructor(private router:Router) { }
  logout() {
    
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('userName') || '';

    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;

    // Bar Chart Configuration
    if (barCtx) {
      const combinedChartConfig: ChartConfiguration = {
          type: 'line',
          data: {
              labels: ['Jan', 'Dec'],
              datasets: [
                  {
                      label: 'Transactions (Line)',
                      data: [10, 15],
                      borderWidth: 1,
                      fill: false,
                      borderColor: 'blue', // Line color for the first dataset
                  },
                  {
                      label: 'Transactions (Bar)',
                      data: [10, 18],
                      borderWidth: 2,
                      backgroundColor: 'rgba(30,58,138, 0.2)', // Bar color for the second dataset
                      borderColor: 'rgba(255, 99, 132, 1)',
                      type: 'bar',
                      yAxisID: 'bar-y-axis' // Assign this dataset to a separate y-axis
                  },
              ],
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                  },
                  'bar-y-axis': {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      grid: {
                          drawOnChartArea: false, // To prevent drawing the gridlines on the line chart area
                      },
                  },
              },
          },
      };
  
      new Chart(barCtx, combinedChartConfig);
  }

    // Line Chart Configuration
    if (lineCtx) {
      const lineChartConfig: ChartConfiguration = {
        type: 'polarArea',
        data: {
          labels: ['Open', 'Closed'],
          datasets: [
            {
              label: 'Transactions',
              data: [5, 2],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      new Chart(lineCtx, lineChartConfig);
    }
  }

  getBackgroundColor(status: string) {
    let bgColor = '';
    switch (status) {
      case 'done':
        bgColor = 'green';
        break;
      case 'working':
        bgColor = 'orange';
        break;
      case 'pending':
        bgColor = 'red';
        break;
      default:
        bgColor = 'orange'; // Setting default to orange
        break;
    }
    return { 'background-color': bgColor };
  }
  servicerequest(){
    
  }
  
}
