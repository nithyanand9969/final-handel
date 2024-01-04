import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'ChartDemo';
  totalCorporateCount = 0;
  totalTraderCount = 0;
  totalIntermediaryCount = 0;

  constructor(private httpClient: HttpClient) {}
  

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.getTotalcorporateCount().subscribe((corpCount: number) => {
      this.totalCorporateCount = corpCount;
      this.getTotaltraderCount().subscribe((traderCount: number) => {
        this.totalTraderCount = traderCount;
        this.getTotalintermediaryCount().subscribe((intermediaryCount: number) => {
          this.totalIntermediaryCount = intermediaryCount;
          this.renderChart();
        });
      });
    });
  }

  getTotalcorporateCount() {
    return this.httpClient.get<number>('http://localhost:8080/home/corporateCount');
  }

  getTotaltraderCount() {
    return this.httpClient.get<number>('http://localhost:8080/home/traderCount');
  }

  getTotalintermediaryCount() {
    return this.httpClient.get<number>('http://localhost:8080/home/intermediaryCount');
  }

  renderChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const chartConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Corporates', 'Traders', 'Intermediaries'],
        datasets: [
          {
            label: 'Total Users',
            data: [this.totalCorporateCount, this.totalTraderCount, this.totalIntermediaryCount],
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

    if (ctx) {
      new Chart(ctx, chartConfig);
    }
  }
}
