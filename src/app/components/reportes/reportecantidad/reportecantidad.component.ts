import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DeviceService } from '../../../services/device.service';
//npm install ng2-charts chart.js --save
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidad',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportecantidad.component.html',
  styleUrl: './reportecantidad.component.css',
})
export class ReportecantidadComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dS: DeviceService) {}

  ngOnInit(): void {
    this.dS.getCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameRoom);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityDevice),
          label: 'Cantidad de dispositivos',
          backgroundColor: [
          '#000080', // Navy
    '#00008B', // Dark Blue
    '#0000CD', // Medium Blue
    '#1E3A78', // Dark Slate Blue
    '#2A52BE', // Denim
    '#003366', // Midnight Blue
    '#4682B4', // Steel Blue
    '#5F9EA0', // Cadet Blue
    '#1E90FF'  // Dodger Blue
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
