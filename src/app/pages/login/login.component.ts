import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {DataService} from '../../data';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, public router:Router, public authHttp:AuthHttp, public link:DataService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

    if(localStorage.getItem('session')){
      this.router.navigate(['/pages/dashboard']);
    }
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let creds = { email_admin: this.email.value, password_admin: this.password.value };
      this.authHttp.post(this.link.urlLogin, creds).subscribe(res => {
        let data = res.json();

        if(data.status){
          localStorage.setItem('session',data.token);
          this.router.navigate(['/pages/dashboard']);
        }
      })
    }
  }
}
