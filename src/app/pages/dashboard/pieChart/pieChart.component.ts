import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {DataService} from '../../../data';
import {PieChartService} from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart {

  public charts = [
      {
        description: 'Peserta',
        stats: '',
        desc: 'orang',
        icon: 'person',
      }, {
        description: 'HackToday',
        stats: '',
        desc: 'tim',
        icon: 'money',
      }, {
        description: 'AppsToday',
        stats: '',
        desc: 'tim',
        icon: 'face',
      }, {
        description: 'Seminar',
        stats: '',
        desc: 'orang',
        icon: 'refresh',
      }
    ];;
  private _init = false;

  constructor(private _pieChartService: PieChartService, public http:Http, public link:DataService) {
    this.http.get(this.link.urlCountAll)
      .subscribe(res => {
        let data = res.json();
        this.charts[0].stats = data.user;
        this.charts[1].stats = data.hack;
        this.charts[2].stats = data.app;
        this.charts[3].stats = data.seminar;
      })
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.im').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(32,158,145,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    // let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    // jQuery('.pie-charts .chart').each(function(index, chart) {
    //   jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    // });
  }
}
