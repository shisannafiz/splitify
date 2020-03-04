import { Component, OnInit, OnDestroy } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { Track } from "src/app/models/track";
import { Playlist } from "src/app/models/playlist";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy{
  master: string = "";
  tracks = Array<Track>();
  index: number = 0;

  name: string = "Playlist";
  title: string = "Title";
  artist: string = "Artist";
  album: string = "Album";
  cover: string;
  preview: string = "";
  uri: string = "";

  created: boolean = false;
  chosen: boolean = false;
  playlists = Array<Playlist>();
  track = Array<string>();

  audio = new Audio();
  timer: number = 0;
  paused: boolean = false;
  playing: boolean = false;
  show: string = "inline-block";
  hide: string = "none";
  playbutton: string;
  pausebutton: string = "none";
  interval: any = setTimeout(() => {
    this.name = this.spotserv.getName();
    this.info();
    this.source();
    this.play();
    setInterval(() => {
      if (!this.paused) {
        if (this.timer >= 99) {
          this.timer = 0;
          this.next();
        } else {
          this.timer = this.audio.currentTime * 3.33;
         }
      }
    }, 300);
  }, 5000);

  constructor(private spotserv: SpotifyService) {}

  ngOnInit() {
    this.getTracks();
    if (this.spotserv.getCreated()) {
      this.getNewPlaylists();
    } else if (this.spotserv.getChosen()) {
      this.getChosenPlaylists();
    } else {
    }
  }

  ngOnDestroy(){
    this.pause();
    this.audio.src = "";
    clearInterval(this.interval);
  }

  getTracks() {
    this.spotserv.getTracks().subscribe((res: any) => {
      res.items.forEach(item => {
        this.tracks.push(item.track);
      });
    });
  }

  getChosenPlaylists() {
    this.spotserv.getChosenPlaylistsIDs().forEach(id => {
      this.spotserv.getPlaylist(id).subscribe((res: any) => {
        this.playlists.push(res);
      });
    });
  }

  getNewPlaylists() {
    this.spotserv.getNewPlaylists().subscribe((res: any) => {
      this.playlists = res.items;
    });
  }

  addTrack(id: string, uris: string[]) {
    this.spotserv.addTracks(id, uris).subscribe((res: any) => {});
  }

  info() {
    this.name = this.spotserv.getName();
    if (this.tracks[this.index].name === undefined) {
      console.log("Undefined");
    }
    this.title = this.tracks[this.index].name;
    if (this.tracks[this.index].artists.length > 2) {
      this.artist =
        this.tracks[this.index].artists[0].name +
        ", " +
        this.tracks[this.index].artists[1].name +
        ", " +
        this.tracks[this.index].artists[2].name;
    } else if (this.tracks[this.index].artists.length > 1) {
      this.artist =
        this.tracks[this.index].artists[0].name +
        ", " +
        this.tracks[this.index].artists[1].name;
    } else {
      this.artist = this.tracks[this.index].artists[0].name;
    }
    this.album = this.tracks[this.index].album.name;
    this.preview = this.tracks[this.index].preview_url;
    this.cover = this.tracks[this.index].album.images[0].url;
    this.uri = this.tracks[this.index].uri;
    this.index++;
  }

  source() {
    this.audio.src = this.preview;
  }

  play() {
    this.audio.play();
    this.paused = false;
    this.playbutton = this.hide;
    this.pausebutton = this.show;
  }

  pause() {
    this.audio.pause();
    this.paused = true;
    this.pausebutton = this.hide;
    this.playbutton = this.show;
  }

  replay() {
    this.source();
    this.play();
    this.timer = 0;
  }

  next() {
    this.info();
    this.source();
    this.play();
    this.timer = 0;
  }

  done() {
    this.pause();
    this.audio.src = "";
    this.spotserv.setDone();
  }

  countdown() {
    this.timer--;
    if ((this.timer = 0)) {
      this.next();
    }
  }

  miss() {
    setInterval(() => {
      this.next();
    }, 3000);
  }

  restart() {
    this.timer = 30;
  }

  add(event: any, id: string, uri: string) {
    this.track.push(uri);
    this.addTrack(id, this.track);
    this.track.pop();
  }
}
