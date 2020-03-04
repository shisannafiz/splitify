import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string = "";
  select: boolean = false;
  create: boolean = false;
  choose: boolean = false;
  confirm: boolean = false;
  home: boolean = false;
  review: boolean = false;
  logout: boolean = true;

  constructor(private spotserv: SpotifyService) { }

  ngOnInit() {
    this.user = this.spotserv.getUsername();
    if(this.spotserv.getSelected()){
      this.select = true;
      this.create = true;
      this.choose = true;
    } 
    if (this.spotserv.getCreated() || this.spotserv.getChosen()) {
      this.confirm = true;
    }
    if(this.spotserv.getConfirmed()){
      this.home = true;
    }
    if(this.spotserv.getDone()){
      this.review = true;
    }
  }
  
  exit(){
    this.spotserv.setToken("");
  }

}
