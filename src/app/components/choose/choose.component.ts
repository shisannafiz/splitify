import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  playlists: Playlist[];
  playlistID: string;
  playlistIDs = Array<string>();

  constructor(private spotserv:SpotifyService) { }

  ngOnInit() {
    this.spotserv.getPlaylists().subscribe((res: any) => {
      this.playlists = res.items;
    });  
  }

  setPlaylistID(event:any, id:string){
    this.playlistID = id;
  }

  addPlaylistID(event: any, id:string){
    this.playlistID = id;
    if (this.playlistIDs.includes(id)) return;
    this.playlistIDs.push(id);
  }

  removeLastPlaylistID(){
    this.playlistIDs.pop();
  }

  setPlaylistIDs(){
    this.spotserv.setChosenPlaylistsIDs(this.playlistIDs);
  }


}
