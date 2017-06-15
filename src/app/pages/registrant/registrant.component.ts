import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'registrant',
  template: `<router-outlet></router-outlet>`
})
export class Registrant {
  constructor(public router:Router) {
  	// this.router.navigate(['/pages/registrant/participant']);
  }
}
