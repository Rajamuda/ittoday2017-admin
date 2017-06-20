import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router,ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'single',
  templateUrl: './single.html',
  styleUrls: ['./single.scss']
})
export class Single {
	userinfo: any;
	userevent: any;
	userid: number;

  constructor(public authHttp: AuthHttp, public route:ActivatedRoute, public router:Router, 
              public link:DataService, public modalService: NgbModal) {
    this.route.params.subscribe(params => {
  		this.userid = params['id'];
  	})
    this.getData(this.userid);
  }

  getData(id){
   	this.authHttp.get(this.link.urlShowCurrUser+id)
      .subscribe(res => {
        let data = res.json();

        if(data.status){
          this.userinfo = data.data[0];
          this.userevent = data.info;
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



}
