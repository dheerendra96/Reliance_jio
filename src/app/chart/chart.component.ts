import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, BaseChartDirective } from 'ng2-charts';
import { AppService } from '../app.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [567, 5767, 462],
  ];
  public mapData;
  public doughnutChartType: ChartType = 'doughnut';
  constructor(private appService: AppService) {
    this.appService.getMapData().subscribe((data) => {
      console.log(123, data);
      if (data['label']) {
        console.log(124, data);
        this.chart.chart.data.datasets[0].data.length = 0;
        this.chart.chart.data.datasets[0].data = [data['downloadSales'], data['InStoreSales'], data['mailStoreSales']]
      }
    });
  }

  async getMapData() {
    this.mapData = await this.appService.getMapData().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }
}
