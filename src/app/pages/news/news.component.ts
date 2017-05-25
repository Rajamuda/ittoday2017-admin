import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'news',
  template: `<router-outlet></router-outlet>`
})
export class News {
  constructor(public router:Router) {
  	this.router.navigate(['/pages/news/view']);
  }
}
