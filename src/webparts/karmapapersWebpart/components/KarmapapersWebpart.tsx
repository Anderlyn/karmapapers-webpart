import * as React from 'react';
import styles from './KarmapapersWebpart.module.scss';
import { IKarmapapersWebpartProps } from './IKarmapapersWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {utils, Utils} from "./utils";
import ChartJS from 'chart.js';
import {Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';

type MyState = {
  name: string,
  chartData: object,
  isItLoading: boolean,
  chartOptions: object
}

class Chart extends React.Component<{}, MyState>{
  constructor(props){
    super(props);
    this.state = {
        name: "Cargando...",  
        chartData: {
          labels: ['Ingenería', 'Liderazgo', 'Arte', 'Ciencia', 'Humanitario'],
          scaleFontColor: "#FFFFFF",
          datasets: [
            {
              label: "KARMA",
              yAxisID: 0, 
              data: [4,4,4,4,4],
              backgroundColor: [
                '#3c8ce8',
                '#6b050f',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
              ]
            }
          ]
        },
        chartOptions:{
          maintainAspectRatio: false,
          legend: {
                labels: {
                    fontColor: 'white'
                    }
                },
          title: {
              display: true,
              fontColor: 'white',
          }     ,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      fontColor: 'white'
                  },
              }],
            xAxes: [{
                  ticks: {
                      fontColor: 'white'
                  },
              }]
          } 
        },
        isItLoading: true
    }
  }
  render(){
      return(
          <div>
             <Bar 
              data={this.state.chartData}
              width={100}
              height={250}
              options={this.state.chartOptions}
             />
          </div>
      )
  }
}

export default class KarmapapersWebpart extends React.Component<IKarmapapersWebpartProps, {}> {
  
  public render(): React.ReactElement<IKarmapapersWebpartProps> {
    return (
      <div className={ styles.karmapapersWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
                <div className={styles.karmaLogo}></div>
                <p className={styles.Name}>Sebastián André López Corrales </p>
                <Chart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
