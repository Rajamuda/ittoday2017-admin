import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'hacktoday',
  templateUrl: './hacktoday.html',
  styleUrls: ['./hacktoday.scss']
})
export class HackToday {
	hack: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_team";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlHackTeamAll)
   	.subscribe(res => {
   		let data = res.json();
   		
   		if(data.status){
   			this.hack = data.data;
   		}else{
          if(data.err_code && data.err_code == 401){
            swal('Session Expired', 'Please Login Again!', 'warning');
            localStorage.removeItem('session');
            this.router.navigate(['/login']);
          }
        }

   	}, err => {
   		swal('No Connection', 'Check your internet connection' , 'error');
   	})
  }

  view(teamid){
    this.router.navigate(['/pages/registrant/hacktoday/'+teamid]);
  }



}
