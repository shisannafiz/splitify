import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:String;
  pass:any;
  count: number = 3;
  multiArray: string[][];

  constructor(private spotserv:SpotifyService) { }

  ngOnInit() {
    console.log(this.spotserv.setCode());
    this.spotserv.getToken().subscribe((res:any) => {
      console.log(res);
    });
  }

  

}
