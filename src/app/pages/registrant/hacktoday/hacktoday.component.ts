import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';
import * as _ from "lodash";

@Component({
  selector: 'hacktoday',
  templateUrl: './hacktoday.html',
  styleUrls: ['./hacktoday.scss']
})
export class HackToday {
	hack: any;
	filterQuery = "";
  rowsOnPage = 10;
	sortBy = "nama_team";
  sortOrder = "asc";

  constructor(public authHttp: AuthHttp, public router:Router, public link:DataService) {
    this.getData();
  }

  getData(){
   this.authHttp.get(this.link.urlHackTeamAll)
   	.subscribe(res => {
   		let data = res.json();

   		if(data.status){
   			this.hack = data.data;
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
    this.router.navigate(['/pages/registrant/hacktoday/'+teamid]);
  }

  generateCsv(){
    var hackCsv = _.cloneDeep(this.hack);

    for(var i=0; i<hackCsv.length; i++){
      hackCsv[i].nama_ketua = hackCsv[i].ketua.getNama;
      if(hackCsv[i].anggota1){
        hackCsv[i].nama_anggota1 = hackCsv[i].anggota1.getNama;
      }else{
        hackCsv[i].nama_anggota1 = "-";
      }
 
      if(hackCsv[i].anggota2){
         hackCsv[i].nama_anggota2 = hackCsv[i].anggota2.getNama;
      }else{
        hackCsv[i].nama_anggota2 = "-";
      }

      if(hackCsv[i].writeup_hack != null){
        hackCsv[i].writeup_hack = "http://ittoday.web.id"+hackCsv[i].writeup_hack;
      }else{
        hackCsv[i].writeup_hack = "-";
      }

      hackCsv[i].nama_team = hackCsv[i].nama_team.replace(/[^a-zA-Z0-9 ]/g, "");
      hackCsv[i].waktu_daftar = hackCsv[i].createdAt;

      delete hackCsv[i].id;
      delete hackCsv[i].ketua_team;
      delete hackCsv[i].anggota1_team;
      delete hackCsv[i].anggota2_team;
      delete hackCsv[i].ketua;
      delete hackCsv[i].anggota1
      delete hackCsv[i].anggota2;
      delete hackCsv[i].skor_team;
      delete hackCsv[i].updatedAt;
      delete hackCsv[i].createdAt;
    }

    var csvData = this.link.ConvertToCSV(hackCsv);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    var date = new Date();
    a.download = 'HackToday_ITTODAY_2017_'+date.getTime()+'.csv';
    a.click();
  }


}
