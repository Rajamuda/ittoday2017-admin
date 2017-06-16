import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'participant',
  templateUrl: './participant.html',
  styleUrls: ['./participant.scss']
})
export class Participant {
	users: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_user";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlShowAllUser)
   	.subscribe(res => {
   		let data = res.json();
   		
   		if(data.status){
   			this.users = data.data;
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

  view(userid){
    this.router.navigate(['/pages/registrant/participant/'+userid]);
  }

}
