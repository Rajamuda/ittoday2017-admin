import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService{
	public token: string;
	public loginUrl: string;
	public userdata: any;
	public id_user: number;
	public isLoggedIn = new Subject<boolean>();

	// public baseUrl = 'https://ittoday.web.id';
	public baseUrl = 'http://localhost:4200';

	public urlCountAll = this.baseUrl+'/api/user/countall';

	public urlLogin = this.baseUrl+'/api/user/loginadmin';
	public urlNews = this.baseUrl+'/api/news';
	public urlNewsCreate = this.baseUrl+'/api/news/create';
	public urlNewsEdit = this.baseUrl+'/api/news/edit';
	public urlNewsDelete = this.baseUrl+'/api/news/delete';

	public urlShowAllUser = this.baseUrl+'/api/user/viewall';
	public urlShowCurrUser = this.baseUrl+'/api/user/viewsingle/'
	public urlInactivateUser = this.baseUrl+'/api/user/inactivateuser';

	public urlAppTeamAll = this.baseUrl+'/api/appteam/all';
	public urlAppTeamSingle = this.baseUrl+'/api/appteam/team/';
	public urlAppTeamQualify = this.baseUrl+'/api/appteam/qualify';
	public urlAppTeamDisqualify = this.baseUrl+'/api/appteam/disqualify';
	public urlAppTeamPayment = this.baseUrl+'/api/appteam/confirmpayment';

	public urlHackTeamAll = this.baseUrl+'/api/hackteam/all';
	public urlHackTeamSingle = this.baseUrl+'/api/hackteam/team/';
	public urlHackTeamQualify = this.baseUrl+'/api/hackteam/qualify';
	public urlHackTeamDisqualify = this.baseUrl+'/api/hackteam/disqualify';

	public urlSeminarAll = this.baseUrl+'/api/seminar/all';


	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}

	public ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

}