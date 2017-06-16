import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService{
	public token: string;
	public loginUrl: string;
	public userdata: any;
	public id_user: number;
	public isLoggedIn = new Subject<boolean>();

	public baseUrl = 'http://localhost:4200';
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

	public urlHackTeamAll = this.baseUrl+'/api/hackteam/all';
	public urlHackTeamSingle = this.baseUrl+'/api/hackteam/team/';
	public urlHackTeamQualify = this.baseUrl+'/api/hackteam/qualify';
	public urlHackTeamDisqualify = this.baseUrl+'/api/hackteam/disqualify';

	public urlSeminarAll = this.baseUrl+'/api/seminar/all';


	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}