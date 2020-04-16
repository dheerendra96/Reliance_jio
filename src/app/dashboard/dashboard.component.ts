import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AuthenticationService } from '../service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public title = 'Reliance Store';
  public dashboardData;
  public currentUser;

  constructor(
    private appService: AppService,
    private authenticationService: AuthenticationService) {
    this.appService.getRelianceStoreData().subscribe((res) => {
      this.dashboardData = res;
      console.log(9809, this.dashboardData);
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).firstName;
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
  }

}
