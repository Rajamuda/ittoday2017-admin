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

	loginAnnounced$ = this.isLoggedIn.asObservable();

	public loginState(state){
			this.isLoggedIn.next(state);
	}


}