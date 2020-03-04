import { Component, OnInit } from "@angular/core";
import { Playlist } from "src/app/models/playlist";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.css"]
})
export class StartComponent implements OnInit {
  master: string;
  playlists = Array<Playlist>();
  created: boolean = false;
  chosen: boolean = false;

  constructor(private spotserv: SpotifyService) {}

  ngOnInit() {
    this.master = this.spotserv.getName();
    if (this.spotserv.getCreated()) {
      this.getNewPlaylists();
    } else if (this.spotserv.getChosen()) {
      this.getChosenPlaylists();
    } else {
    }
  }

  getNewPlaylists() {
    this.spotserv.getNewPlaylists().subscribe((res: any) => {
      this.playlists = res.items;
    });
  }

  getChosenPlaylists() {
    this.spotserv.getChosenPlaylistsIDs().forEach(id => {
      this.spotserv.getPlaylist(id).subscribe((res: any) => {
        this.playlists.push(res);
      });
    });
  }

  start() {
    this.spotserv.setConfirmed();
  }
}
