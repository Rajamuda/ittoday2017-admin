import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';
import * as _ from "lodash";

@Component({
  selector: 'seminar',
  templateUrl: './seminar.html',
  styleUrls: ['./seminar.scss']
})
export class Seminar {
	seminar: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_user";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlSeminarAll)
   	.subscribe(res => {
   		let data = res.json();
       
   		if(data.status){
   			this.seminar = data.data;
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

  view(userid){
    this.router.navigate(['/pages/registrant/participant',userid]);
  }

generateCsv(){
    var semCsv: any = _.cloneDeep(this.seminar);

    for(var i =0; i<semCsv.length; i++){
      semCsv[i].nama_user = semCsv[i].user.nama_user.replace(/[^a-zA-Z0-1 ]/g, "");
      semCsv[i].telepon_user = semCsv[i].user.getTelepon;
      semCsv[i].email_user = semCsv[i].user.getEmail;

      semCsv[i].waktu_daftar = semCsv[i].createdAt;
      
      delete semCsv[i].user;
      delete semCsv[i].createdAt; 
      delete semCsv[i].id;
      delete semCsv[i].pendaftar_seminar;
      delete semCsv[i].updatedAt;
      delete semCsv[i].getTelepon;
    }
    var csvData = this.link.ConvertToCSV(semCsv);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    var date = new Date();
    a.download = 'Seminar_ITTODAY_2017_'+date.getTime()+'.csv';
    a.click();
  }

}
