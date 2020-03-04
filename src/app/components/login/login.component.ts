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
  token: string;
  arr = [
    {
    name: "xyz"
    },
    {
      name: "abc"
    },
    {
      name: "stu"
    },
    {
      name: "efg",
    }
  ];
  sorted = Array<any>();

  constructor(private spotserv:SpotifyService) { }

  ngOnInit() {
    // this.arr.sort((n1, n2) => {
    //   if (n1.name > n2.name) {
    //       return 1;
    //   }
    //   if (n1.name < n2.name) {
    //       return -1;
    //   }
    //   return 0;
    // });
  }

  login(){
    this.spotserv.requestAccess();
  }
  
  setCode(){
    this.spotserv.setCode();
  }

  setToken(){
    this.spotserv.setToken(this.token);
  }

  access(){
    this.spotserv.getToken()
      .subscribe((res:any) => {
        setTimeout(() => {
          this.spotserv.setToken(res.access_token);
        }, 500);
      })
  }

  all(){
    this.setCode();
    this.access();
    // setTimeout(() => {
    //   this.setToken();
    // }, 500);
  }
}
