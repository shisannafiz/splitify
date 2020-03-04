import { Component, OnInit, OnDestroy } from "@angular/core";
import { Playlist } from "../../models/playlist";
import { SpotifyService } from "../../services/spotify.service";
import { Track } from "../../models/track";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit, OnDestroy {
  playlists = Array<Playlist>();
  playlistName: string = "Playlist";
  playlistID: string = "";
  tracks = Array<Track>();
  titles = Array<Track>();
  artists = Array<Track>();
  positions = Array<Track>();
  position = Array<number>();
  titleOrder: boolean = false;
  artistOrder: boolean = false;
  titleColor: string = "grey";
  artistColor: string = "grey";
  audio = new Audio();
  preview: string = "";
  name: string = "";
  artist: string = "";
  removed: boolean = false;

  constructor(private spotserv: SpotifyService) {}

  ngOnInit() {
    if (this.spotserv.getCreated()) {
      this.getNewPlaylists();
    } else if (this.spotserv.getChosen()) {
      this.getChosenPlaylists();
    } else {
    }
  }

  ngOnDestroy(){
    this.audio.pause();
    this.audio.src = "";
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

  showTracks(event: any, id: string, name: string) {
    this.getTracks(id, name);
    var time: number = 0;
    if (this.tracks.length < 25) {
      time = 300;
    } else if (this.tracks.length < 50) {
      time = 600;
    } else if (this.tracks.length < 75) {
      time = 900;
    } else {
      time = 1200;
    }
    setTimeout(() => {
      if (this.titleOrder && !this.artistOrder) {
        this.sortTitles();
      }
      if (this.artistOrder && !this.titleOrder) {
        this.sortArtists();
      }
    }, time);
  }

  getTracks(id: string, name: string) {
    this.playlistName = name;
    this.playlistID = id;
    this.tracks = [];
    this.positions = [];
    this.spotserv.getAllTracks(id).subscribe((res: any) => {
      res.items.forEach(item => {
        this.tracks.push(item.track);
        this.positions.push(item.track);
      });
    });
  }

  sortTitles() {
    this.titles = this.tracks.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    this.titleOrder = true;
    this.titleColor = "white";
    this.artistOrder = false;
    this.artistColor = "grey";
  }

  sortArtists() {
    this.artists = this.tracks.sort((a, b) => {
      if (a.artists[0].name > b.artists[0].name) {
        return 1;
      }
      if (a.artists[0].name < b.artists[0].name) {
        return -1;
      }
      if (a.artists[0].name === b.artists[0].name) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }
      return 0;
    });
    this.artistOrder = true;
    this.artistColor = "white";
    this.titleOrder = false;
    this.titleColor = "grey";
  }

  removeTrack(uri: string, name: string) {
    this.removed = true;
    this.position = [];
    this.position.push(this.positions.findIndex(pos => pos.name === name));
    const track: any = [
      {
        uri: uri,
        positions: this.position
      }
    ];
    this.spotserv
      .deleteTracks(this.playlistID, track)
      .subscribe((res: any) => {});
    setTimeout(() => {
      this.showTracks(event, this.playlistID, this.playlistName);
      this.removed = false;
    }, 250);
  }

  playPreview(preview: string, name: string, artist: string) {
    if(this.removed) return;
    this.name = name;
    this.artist = artist;
    this.audio.src = preview;
    this.audio.play();
    this.removed = false;
  }
}
