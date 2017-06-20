import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';
import * as _ from "lodash";

@Component({
  selector: 'appstoday',
  templateUrl: './appstoday.html',
  styleUrls: ['./appstoday.scss']
})
export class AppsToday {
	apps: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_team";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlAppTeamAll)
   	.subscribe(res => {
   		let data = res.json();

   		if(data.status){
   			this.apps = data.data;
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

  view(teamid){
    this.router.navigate(['/pages/registrant/appstoday/'+teamid]);
  }

  generateCsv(){
    var appCsv = _.cloneDeep(this.apps);

    for(var i=0; i<appCsv.length; i++){
      appCsv[i].nama_ketua = appCsv[i].ketua.getNama;
      if(appCsv[i].anggota1){
        appCsv[i].nama_anggota1 = appCsv[i].anggota1.getNama;
      }else{
        appCsv[i].nama_anggota1 = "-";
      }
 
      if(appCsv[i].anggota2){
         appCsv[i].nama_anggota2 = appCsv[i].anggota2.getNama;
      }else{
        appCsv[i].nama_anggota2 = "-";
      }

      if(appCsv[i].proposal_app != null){
        appCsv[i].proposal_app = "http://ittoday.web.id"+appCsv[i].proposal_app;
      }else{
        appCsv[i].proposal_app = "-";
      }

      if(!appCsv[i].nama_app){
        appCsv[i].nama_app = "-";
      }

      if(!appCsv[i].video_app){
        appCsv[i].video_app = "-";
      }

      if(!appCsv[i].status_pembayaran_app){
        appCsv[i].status_pembayaran_app = false;
      }
      appCsv[i].waktu_daftar = appCsv[i].createdAt;
      appCsv[i].nama_team = appCsv[i].nama_team.replace(/[^a-zA-Z0-9 ]/g, "");
      appCsv[i].nama_app = appCsv[i].nama_app.replace(/[^a-zA-Z0-9 ]/g, "");

      delete appCsv[i].id;
      delete appCsv[i].ketua_team;
      delete appCsv[i].anggota1_team;
      delete appCsv[i].anggota2_team;
      delete appCsv[i].ketua;
      delete appCsv[i].anggota1
      delete appCsv[i].anggota2;
      delete appCsv[i].link_app;
      delete appCsv[i].pembayaran_app;
      delete appCsv[i].status_team;
      delete appCsv[i].updatedAt;
      delete appCsv[i].createdAt;
    }

    var csvData = this.link.ConvertToCSV(appCsv);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    var date = new Date();
    a.download = 'AppsToday_ITTODAY_2017_'+date.getTime()+'.csv';
    a.click();
  }


}
