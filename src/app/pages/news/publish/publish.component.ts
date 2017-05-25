import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'publish',
  templateUrl: './publish.html'
})
export class Publish {
	public newstitle:string = '';
	public ckeditorContent:string = '';
  public config = {
    uiColor: '#F0F3F4',
    height: '250',
  };

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {

  }

  public submit(){
  	let creds = {judul_news: this.newstitle, isi_news: this.ckeditorContent};
  	this.authHttp.post(this.link.urlNewsCreate, creds).subscribe(res => {
  		let data = res.json();

  		if(data.status){
  			swal('Berhasil', 'Berita sudah dipublikasikan', 'success');
  			this.router.navigate(['/pages/news/view']);
  		}else if(data.err_code && data.err_code == 401){
        swal('Silakan login lagi');
        this.router.navigate(['/login']);
      }else{
  			swal('Gagal', 'Terjadi kesalahan', 'info');
  		}
  	})
  }
}
