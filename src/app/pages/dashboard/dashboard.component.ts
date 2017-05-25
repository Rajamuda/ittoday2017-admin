import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(public authHttp: AuthHttp, public router:Router) {
    console.log(localStorage.getItem('session'));
  	if(localStorage.getItem('session')){
      let data = {token: localStorage.getItem('session')}
      this.authHttp.post('http://localhost:4200/api/user/session', data)
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
