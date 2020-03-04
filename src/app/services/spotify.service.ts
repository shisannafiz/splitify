import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private clientID = "c0cf72f3a5c74d27b6de0d11071581c2";
  private clientSecret = "";
  private encode: string = "";
  private encoded = btoa(this.clientID + ":" + this.clientSecret);
  private code: string = "";
  private redirect_uri: string = "https://splitify-ac7ab.firebaseapp.com/start";
  private access_token: string;
  private searchURL: string = "";
  private userID: string = "";

  private mainPlaylistName: string = "";
  private mainPlaylistID: string = "";
  private newPlaylistCount: number = 0;
  private chosenPlaylistsIDs: string[] = [];

  private selected: boolean = false;
  private created: boolean = false;
  private chosen: boolean = false;
  private confirmed: boolean = false;
  private done: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  setName(name: string) {
    this.mainPlaylistName = name;
  }

  getName() {
    return this.mainPlaylistName;
  }

  setID(id: string) {
    this.mainPlaylistID = id;
  }

  getID() {
    return this.mainPlaylistID;
  }

  setNewPlaylistCount(count: number) {
    this.newPlaylistCount = count;
  }

  setChosenPlaylistsIDs(playlists: string[]) {
    this.chosenPlaylistsIDs = playlists;
  }

  getChosenPlaylistsIDs() {
    return this.chosenPlaylistsIDs;
  }

  setSelected() {
    this.selected = true;
  }

  getSelected() {
    return this.selected;
  }

  setCreated() {
    this.created = true;
  }

  getCreated() {
    return this.created;
  }

  setChosen() {
    this.chosen = true;
  }

  getChosen() {
    return this.chosen;
  }

  setConfirmed() {
    this.confirmed = true;
  }

  getConfirmed() {
    return this.confirmed;
  }

  setDone() {
    this.done = true;
  }

  getDone() {
    return this.done;
  }

  requestAccess() {
    const scope =
      "playlist-read-private playlist-modify-public playlist-modify-private";
    window.location.href =
      "https://accounts.spotify.com/authorize?" +
      "client_id=" +
      this.clientID +
      "&scope=" +
      scope +
      "&redirect_uri=" +
      this.redirect_uri +
      "&response_type=code";
  }

  setCode() {
    this.code = this.route.snapshot.queryParamMap.get("code");
  }

  getToken() {
    const header = {
      headers: new HttpHeaders({
        Authorization: "Basic " + this.encode,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };
    const body =
      "grant_type=authorization_code&code=" +
      this.code +
      "&redirect_uri=" +
      this.redirect_uri;
    const url = "https://accounts.spotify.com/api/token";
    return this.http.post(url, body, header).pipe(map(res => res));
  }

  setToken(token: string) {
    this.access_token = token;
  }

  checkToken() {
    return !!this.access_token;
  }

  setUsername() {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL = "https://api.spotify.com/v1/me";
    this.http.get(this.searchURL, options).subscribe((res: any) => {
      this.userID = res.display_name;
    });
  }

  getUsername() {
    return this.userID;
  }

  createPlaylist(name: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    const body = {
      name: name,
      public: true
    };
    this.searchURL =
      "https://api.spotify.com/v1/users/" + this.userID + "/playlists";
    return this.http.post(this.searchURL, body, options).pipe(map(res => res));
  }

  getPlaylist(id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL = "https://api.spotify.com/v1/playlists/" + id;
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  getPlaylists() {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL = "https://api.spotify.com/v1/me/playlists?limit=48";
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  getNewPlaylists() {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL =
      "https://api.spotify.com/v1/me/playlists?limit=" + this.newPlaylistCount;
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  showNewPlaylists(count: number) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL = "https://api.spotify.com/v1/me/playlists?limit=" + count;
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  addTracks(playlistID: string, uris: string[]) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    const body = {
      uris: uris
    };
    this.searchURL =
      "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
    return this.http.post(this.searchURL, body, options);
  }

  getTracks() {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL =
      "https://api.spotify.com/v1/playlists/" + this.mainPlaylistID + "/tracks";
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  getAllTracks(id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      })
    };
    this.searchURL = "https://api.spotify.com/v1/playlists/" + id + "/tracks";
    return this.http.get(this.searchURL, options).pipe(map(res => res));
  }

  deleteTracks(playlistID: string, track: any) {
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.access_token,
        "Content-Type": "application/json"
      }),
      body: {
        tracks: track
      }
    };
    this.searchURL =
      "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
    return this.http.delete(this.searchURL, options);
  }
}
