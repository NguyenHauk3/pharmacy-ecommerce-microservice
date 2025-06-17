import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { OrderReportDTO, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit{
//     reportData: OrderReportDTO[] = [];
//   totalOrders = 0;
//   totalRevenue = 0;

//   barChartData: ChartConfiguration<'bar'>['data'] = {
//     labels: [],
//     datasets: []
//   };

//   barChartOptions = {
//     responsive: true,
//     scales: {
//       y: { beginAtZero: true }
//     }
//   };

//   constructor(private orderService: OrderService) {}

//   ngOnInit(): void {
//     this.orderService.getOrderReportLast7Days().subscribe(data => {
//       this.reportData = data;
//       this.totalOrders = data.reduce((sum, d) => sum + d.orderCount, 0);
//       this.totalRevenue = data.reduce((sum, d) => sum + Number(d.totalRevenue), 0);

//       this.barChartData = {
//         labels: data.map(d => d.date),
//         datasets: [
//           { data: data.map(d => d.orderCount), label: 'Số đơn hàng', backgroundColor: '#42A5F5' },
//           { data: data.map(d => Number(d.totalRevenue)), label: 'Doanh thu', backgroundColor: '#4bc0c0' }
//         ]
//       };
//     });
//   }
// }
  reportData: OrderReportDTO[] = [];
  totalOrders = 0;
  totalRevenue = 0;
  selectedRange: number = 7; // Mặc định là 7 ngày

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y1: {
        beginAtZero: true,
        position: 'left',
        title: {
          display: true,
          text: 'Số đơn hàng'
        }
      },
      y2: {
        beginAtZero: true,
        position: 'right',
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadReportData(7); // Mặc định là 7 ngày
  }

  loadReportData(days: number): void {
    this.selectedRange = days;

    const report$ = days === 30
      ? this.orderService.getOrderReportLast30Days()
      : this.orderService.getOrderReportLast7Days();

    report$.subscribe(data => {
      this.reportData = data;
      this.totalOrders = data.reduce((sum, d) => sum + d.orderCount, 0);
      this.totalRevenue = data.reduce((sum, d) => sum + Number(d.totalRevenue), 0);

      this.barChartData = {
        labels: data.map(d => d.date),
        datasets: [
          {
            data: data.map(d => d.orderCount),
            label: 'Số đơn hàng',
            backgroundColor: '#42A5F5',
             yAxisID: 'y1',
            barThickness: 30
          },
          {
            data: data.map(d => Number(d.totalRevenue)),
            label: 'Doanh thu',
            backgroundColor: '#66BB6A',
             yAxisID: 'y2',
            barThickness: 30
          }
        ]
      };
    });
  }
}