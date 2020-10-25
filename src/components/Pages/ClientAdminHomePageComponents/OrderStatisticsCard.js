import React from 'react';
import ReactApexChart from "react-apexcharts";

const OrderStatisticsCard = (props) => {

  const today_total_orders = props.graph_data.today_total_orders
  const today_delivered_orders = props.graph_data.today_delivered_orders
  const today_pending_orders = props.graph_data.today_pending_orders

  const yesterday_total_orders = props.graph_data.yesterday_total_orders
  const yesterday_pending_orders = props.graph_data.yesterday_pending_orders
  const yesterday_delivered_orders = props.graph_data.yesterday_delivered_orders

  const week_ago_total_orders = props.graph_data.week_ago_total_orders
  const week_ago_pending_orders = props.graph_data.week_ago_pending_orders
  const week_ago_delivered_orders = props.graph_data.week_ago_delivered_orders

  const this_month_total_orders = props.graph_data.this_month_total_orders
  const this_month_delivered_orders = props.graph_data.this_month_delivered_orders
  const this_month_pending_orders = props.graph_data.this_month_pending_orders

  const this_year_total_orders = props.graph_data.this_year_total_orders
  const this_year_delivered_orders = props.graph_data.this_year_delivered_orders
  const this_year_pending_orders = props.graph_data.this_year_pending_orders

  const total_orders = props.graph_data.total_orders
  const total_orders_delivered = props.graph_data.total_delivered_orders
  const total_pending_orders = props.graph_data.total_pending_orders

  const data = { 
      series: [{
        name: 'Total Orders',
        data: [today_total_orders, yesterday_total_orders, week_ago_total_orders, this_month_total_orders, this_year_total_orders, total_orders]
      }, {
        name: 'Orders Delivered',
        data: [today_delivered_orders, yesterday_delivered_orders, week_ago_delivered_orders, this_month_delivered_orders, this_year_delivered_orders, total_orders_delivered]
      }, {
        name: 'Pending Orders',
        data: [today_pending_orders, yesterday_pending_orders, week_ago_pending_orders, this_month_pending_orders, this_year_pending_orders, total_pending_orders]
      },
    ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Today', 'Yesterday', 'Last 7 days', 'This Month', 'This Year', 'Total Orders'],
        },
        yaxis: {
          title: {
            text: '(orders)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val 
            }
          }
        }
      },
    }
  

    
    return (
      <div className="col-lg-7 mb-4">
        <div className="card card-header-actions">
            <div className="card-header">
                Order Statistics
            </div>
            <div className="card-body  recent-activity-wrapper">
                <div className="mixed-chart">
                {( total_orders !== undefined ? 
                  <ReactApexChart  
                    options={data.options}  series={data.series} 
                    type="bar" height="240"  width="100%" 
                  /> 
                   : '')}
               </div>
            </div>
         </div>
       </div>
    )
 }

export default OrderStatisticsCard;
