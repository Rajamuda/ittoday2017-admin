import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router,ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'single',
  templateUrl: './single.html',
  styleUrls: ['./single.scss']
})
export class Single {
	private userinfo: any;
	private userevent: any;
	private userid: number;

  constructor(public authHttp: AuthHttp, public route:ActivatedRoute, public router:Router, public link:DataService) {
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
        }
      }, err => {
       swal('No Connection', 'Check your internet connection' , 'error');
     })
  }



}
