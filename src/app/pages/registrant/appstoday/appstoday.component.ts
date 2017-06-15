import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'appstoday',
  templateUrl: './appstoday.html',
  styleUrls: ['./appstoday.scss']
})
export class AppsToday {
	apps: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_team";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlAppTeamAll)
   	.subscribe(res => {
   		let data = res.json();
   		
   		if(data.status){
   			this.apps = data.data;
   		}

   	}, err => {
   		swal('No Connection', 'Check your internet connection' , 'error');
   	})
  }

  view(teamid){
    this.router.navigate(['/pages/registrant/appstoday/'+teamid]);
  }



}
