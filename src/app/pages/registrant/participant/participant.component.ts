import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';
import * as _ from "lodash";

@Component({
  selector: 'participant',
  templateUrl: './participant.html',
  styleUrls: ['./participant.scss']
})
export class Participant {
	users: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_user";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlShowAllUser)
   	.subscribe(res => {
   		let data = res.json();
   		
   		if(data.status){
   			this.users = data.data;
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
    this.router.navigate(['/pages/registrant/participant/'+userid]);
  }

  generateCsv(){
    var partCsv: any = _.cloneDeep(this.users);

    for(var i =0; i<partCsv.length; i++){
      delete partCsv[i].getNama;
      delete partCsv[i].getPassword;
      delete partCsv[i].getEmail;
      delete partCsv[i].getTelepon;
      delete partCsv[i].getKelamin;
      delete partCsv[i].getLahir;
      delete partCsv[i].getAlamat;
      delete partCsv[i].getTingkat;
      delete partCsv[i].getIdentitas;
      delete partCsv[i].getInstitusi;
      delete partCsv[i].getFoto;
      delete partCsv[i].id;
      delete partCsv[i].password_user;
      delete partCsv[i].status_user;
      delete partCsv[i].lahir_user;
      delete partCsv[i].identitas_user;
      delete partCsv[i].foto_user;
      delete partCsv[i].user_identity_null;
      delete partCsv[i].updatedAt;
      delete partCsv[i].token_forgetpass_user;

      partCsv[i].telepon_user = partCsv[i].telepon_user.toString();

      if(partCsv[i].telepon_user[0] == '6' && partCsv[i].telepon_user[1] == '2'){
        partCsv[i].telepon_user = "0"+partCsv[i].telepon_user.slice(2);
      }else{
        partCsv[i].telepon_user = "0"+partCsv[i].telepon_user;
      }

      if(partCsv[i].tingkat_user == 'S1'){
        partCsv[i].tingkat_user = "Mahasiswa";
      }else if(partCsv[i].tingkat_user == 'SMA'){
        partCsv[i].tingkat_user = "SMA/SMK Sederajat";
      }

      partCsv[i].alamat_user = partCsv[i].alamat_user.replace(/[^a-zA-Z0-9\/\&\. ]/g, "");
      partCsv[i].nama_user = partCsv[i].nama_user.replace(/[^a-zA-Z0-1 ]/g, "");

      partCsv[i].waktu_daftar = partCsv[i].createdAt;
      delete partCsv[i].createdAt; 

    }
    var csvData = this.link.ConvertToCSV(partCsv);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    var date = new Date();
    a.download = 'pendaftar_ITTODAY_2017_'+date.getTime()+'.csv';
    a.click();
  }

}
