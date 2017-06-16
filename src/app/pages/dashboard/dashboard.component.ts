import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {DataService} from '../../data';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    console.log(localStorage.getItem('session'));
  	if(localStorage.getItem('session')){
      let data = {token: localStorage.getItem('session')}
      this.authHttp.post(this.link.baseUrl+'/api/user/session', data)
        .subscribe(res => {
          let data = res.json();

          if(data.status){
            this.router.navigate(['/pages/dashboard']);
          }else{
            localStorage.removeItem('session');
            this.router.navigate(['/login']);
          }
        })
    }else{
      this.router.navigate(['/login']);
    }
  }

}
