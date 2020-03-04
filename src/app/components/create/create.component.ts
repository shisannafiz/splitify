import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { Playlist } from "src/app/models/playlist";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  name: string;
  count: number = 0;
  playlists: Playlist[];

  constructor(private spotserv: SpotifyService) {}

  ngOnInit() {}

  createPlaylist() {
    this.spotserv.createPlaylist(this.name).subscribe((res: any) => {});
    setTimeout(() => {
      this.getNewPlaylists();
    }, 300);
    this.count++;
    this.name = "";
  }

  getNewPlaylists() {
    this.spotserv.showNewPlaylists(this.count).subscribe((res: any) => {
      this.playlists = res.items;
    });
  }

  setCount() {
    this.spotserv.setCreated();
    this.spotserv.setCreated();
    this.spotserv.setNewPlaylistCount(this.count);
  }
}
