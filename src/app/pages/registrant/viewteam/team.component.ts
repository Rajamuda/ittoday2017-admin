import {Component} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {RequestOptions} from '@angular/http';
import {Router,ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {DataService} from '../../../data';

@Component({
  selector: 'team',
  templateUrl: './team.html',
  styleUrls: ['./team.scss']
})
export class Team {
	teamid: string;
  teaminfo: any;
  leader: any;
  member: any;
  event: string;

  constructor(public authHttp: AuthHttp, public route:ActivatedRoute, public router:Router, public link:DataService) {
  	this.route.params.subscribe(params => {
  		this.teamid = params['team'];
  	})

  	if(this.router.url.toString().indexOf('appstoday') !== -1){
  		console.log('AppsToday');
      this.event = 'apps';
  		this.getAppsTeam(this.teamid);
  	}else if(this.router.url.toString().indexOf('hacktoday') !== -1){
  		console.log('HackToday');
      this.event = 'hack';
  		this.getHackTeam(this.teamid);
  	}
  }

  getAppsTeam(id){
    this.authHttp.get(this.link.urlAppTeamSingle+id)
      .subscribe(res => {
        let data = res.json();
        
        if(data.status){
          this.teaminfo = data.data;
          this.leader = data.leader;
          this.member = data.member;
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

  getHackTeam(id){
    this.authHttp.get(this.link.urlHackTeamSingle+id)
      .subscribe(res => {
        let data = res.json();

        if(data.status){
          this.teaminfo = data.data;
          this.leader = data.leader;
          this.member = data.member;
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

  disqualify(status){
    let creds = {id: this.teamid, status: status};
    var link;

    if(this.event == 'hack')
      link = this.link.urlHackTeamDisqualify;
    else
      link = this.link.urlAppTeamDisqualify;

    this.confirm().then(res => {
      this.authHttp.post(link, creds)
        .subscribe(res => {
          let data = res.json();
          
          if(data.status){
            if(status){
              swal('Success', 'Team <b>Disqualified</b>', 'success');
              this.teaminfo.diskualifikasi_team = true;
            }else{
              swal('Success', 'Team <b>Undisqualified</b>', 'success');
              this.teaminfo.diskualifikasi_team = false;
            }
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
    }).catch((err) => {
      console.log(err);
    })

  }

  qualify(status, type?){
    var creds, link;

    if(this.event == 'hack'){
      creds = {id: this.teamid, status: status}
      link = this.link.urlHackTeamQualify;
    }else if(this.event == 'apps'){
      creds = {id: this.teamid, status: status, qualify: type}
      link = this.link.urlAppTeamQualify;
    }

    this.confirm().then(res => {
      this.authHttp.post(link, creds)
        .subscribe(res => {
          let data = res.json();

          if(data.status){
            if(this.event == 'hack' || (this.event == 'apps' && type == 'FINAL')){
              if(status){
                swal('Success', 'Team <b>Qualified</b> for FINAL', 'success');
                this.teaminfo.finalis_team = true;
              }else{
                swal('Success', 'Team <b>Unqualified</b> for FINAL', 'success');
                this.teaminfo.finalis_team = false;
              }
            }else{
              if(status){
                swal('Success', 'Team <b>Qualified</b> for SEMIFINAL', 'success');
                this.teaminfo.semifinalis_team = true;
              }else{
                swal('Success', 'Team <b>Unqualified</b> for SEMIFINAL', 'success');
                this.teaminfo.semifinalis_team = false;
              }
            }
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
    }).catch((err) => {
      console.log(err);
    })
  }

  confirm(){
    return swal({
        title: 'Are you sure?',
        text: "Make sure it is the team!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I am sure!'
      })
  }

}
