import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private spotserv:SpotifyService) { }

  ngOnInit() {
    this.all();
  }

  all(){
    this.setCode();
    this.access();
  }

  setCode(){
    this.spotserv.setCode();
  }

  access(){
    this.spotserv.getToken()
      .subscribe((res:any) => {
        setTimeout(() => {
          this.spotserv.setToken(res.access_token);
          this.spotserv.setUsername();
        }, 500);
      })
  }



}

