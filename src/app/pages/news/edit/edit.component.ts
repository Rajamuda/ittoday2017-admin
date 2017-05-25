import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data'

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'edit',
  templateUrl: './edit.html'
})
export class Edit {
  public id: number;
	public newstitle:string = '';
	public ckeditorContent:string = '';
  public config = {
    uiColor: '#F0F3F4',
    height: '250',
  };

  constructor(public authHttp: AuthHttp, public router:Router, public route:ActivatedRoute, public link:DataService) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    this.authHttp.get(this.link.urlNews+'/'+this.id)
      .subscribe(res => {
        let data = res.json();

        if(data.status){
          this.newstitle = data.data.judul_news;
          this.ckeditorContent = data.data.isi_news;
        }else{
          swal('Gagal', data.message, 'error');
          this.router.navigate(['/pages/news']);
        }
      });
  }

  public submit(){
  	let creds = {judul_news: this.newstitle, isi_news: this.ckeditorContent};
  	this.authHttp.post(this.link.urlNewsEdit, creds).subscribe(res => {
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
