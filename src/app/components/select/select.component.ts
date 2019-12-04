import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Playlist } from '../../models/playlist';
import { Track } from '../../models/track';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  playlists: Playlist[];
  playlistName: string;
  playlistID: string;

  constructor(private spotserv:SpotifyService) { }

  ngOnInit() {
    this.spotserv.getPlaylists().subscribe((res: any) => {
      this.playlists = res.items;
    });  
  }

  getPlaylistInfo(event:any, id: string, name: string){
    this.playlistID = id;
    this.playlistName = name;
  }

  setPlaylistInfo(){
    this.spotserv.setID(this.playlistID);
    this.spotserv.setName(this.playlistName);
  }

}
