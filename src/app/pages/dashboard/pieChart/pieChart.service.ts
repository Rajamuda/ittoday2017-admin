import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {Http} from '@angular/http'

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider, public http: Http) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'User terdaftar',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'HackToday',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'AppsToday',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Seminar',
        stats: '32,592',
        icon: 'refresh',
      }
    ];
  }
}
