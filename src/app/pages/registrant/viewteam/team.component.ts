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
	private teamid: string;
  private teaminfo: any;
  private leader: any;
  private member: any;
  private event: string;

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
        }
      }, err => {
       swal('No Connection', 'Check your internet connection' , 'error');
     })
  }



}
