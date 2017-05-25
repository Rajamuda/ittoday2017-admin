import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'view',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class View {
  data: any;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "createdAt";
  sortOrder = "desc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  edit(item){
    this.router.navigate(['/pages/news/edit', item]);
  }

  remove(item){
    var isconfirm = false;
    var body = new RequestOptions({
      body: {id: item}
    })
     
   this.confirm().then(res => {
      this.authHttp.delete(this.link.urlNewsDelete, body)
        .subscribe(res =>{
           let data = res.json();
           if(data.status){
             swal('Berhasil', 'Delete news berhasil', 'success');
             this.getData();
           }else if(data.err_code && data.err_code == 401){
             swal('Silakan login lagi');
             this.router.navigate(['/login']);
           }else{
             swal('Gagal', 'Delete news gagal', 'warning');
           }
        });
   }).catch(err => {
     console.log(err);
   })

  }

  confirm(){
    return swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
  }

  getData(){
    this.authHttp.get(this.link.urlNews)
      .subscribe(res => {
        let hasil = res.json();

        if(hasil.status){
          this.data = hasil.data;
        }
      });
  }



}
