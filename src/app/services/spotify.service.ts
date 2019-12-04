import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  private clientID = 'c0cf72f3a5c74d27b6de0d11071581c2';
  private clientSecret = '';
  private encoded = btoa(this.clientID + ';' + this.clientSecret);
  private code: string;
  private access_token = 'BQBGp6IGGpMQQ1BZseXIndcRtRVW_Fy50ulnGmlKvPXH2_sXs4UEphfCrx4FCqGQLd38KEyQRERhzEAHhimP5cdgiLitZHZwlSDjWIuPK96YJbmNeYC7wiYncgfSily5rVlk-ddQp1NTAIdwUhk_b9a932LmsuAqgr429LZnrzYSvSveYcoVuwWg0vW655FQp4W7pW5f-vhTgzzMGaevyeF_mIqm';
  private searchURL:string = "";
  private userID = 'shisannafiz8';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.access_token,
      'Content-Type': 'application/json'
    })
  }

  private masterPlaylistName: string = '';
  private masterPlaylistID: string = '';
  private newPlaylistCount: number = 0;
  private chosenPlaylistsIDs: string[] = [];

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  setName(name: string){
    this.masterPlaylistName = name;
  }

  getName(){
    return this.masterPlaylistName;
  }

  setID(id: string){
    this.masterPlaylistID = id;
  }

  getID(){
    return this.masterPlaylistID;
  }

  setNewPlaylistCount(count : number){
    this.newPlaylistCount = count;
  }

  setChosenPlaylistsIDs(playlists : string[]){
    this.chosenPlaylistsIDs = playlists;
  }

  getChosenPlaylistsIDs(){
    return this.chosenPlaylistsIDs;
  }

  requestAccess(){
    window.location.replace('https://accounts.spotify.com/authorize?' + 
    'client_id=' + this.clientID +
    '&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private' +
    '&response_type=code' +
    '&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin'
    );
  }

  setCode(){
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    })
  }

  getToken(){
    const authflow = 'grant_type=authorization_code' + 
    '&code=' + this.code + 
    '&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin';
    const options = {
      grant_type: 'authorization_code',
      code: this.code,
      redirect_uri: 'http%3A%2F%2Flocalhost%3A4200%2Flogin'
    }
    return this.http.post('https://accounts.spotify.com/api/token', options, this.httpOptions);
  }

  createPlaylist(name: string){
    const body = { 
      name: name,
      public: true
    }
    this.searchURL = 'https://api.spotify.com/v1/users/'+this.userID+"/playlists";
    return this.http.post(this.searchURL, body, this.httpOptions)
      .pipe(map(res => res));
  }

  getPlaylist(id: string){
    this.searchURL = 'https://api.spotify.com/v1/playlists/' + id;
    return this.http.get(this.searchURL, this.httpOptions)
      .pipe(map(res => res));
  }

  getPlaylists(){
    this.searchURL = 'https://api.spotify.com/v1/me/playlists?limit=48';
    return this.http.get(this.searchURL, this.httpOptions)
      .pipe(map(res => res));
  }

  getNewPlaylists(){
    this.searchURL = 'https://api.spotify.com/v1/me/playlists?limit='+ this.newPlaylistCount;
    return this.http.get(this.searchURL, this.httpOptions)
      .pipe(map(res => res));
  }

  showNewPlaylists(count: number){
    this.searchURL = 'https://api.spotify.com/v1/me/playlists?limit='+ count;
    return this.http.get(this.searchURL, this.httpOptions)
      .pipe(map(res => res));
  }

  addTracks(playlist: string, uris: string[]){
    const body = {
      uris: uris
    }
    this.searchURL = 'https://api.spotify.com/v1/playlists/'+playlist+"/tracks";
    return this.http.post(this.searchURL, body, this.httpOptions)
  }

  getTracks(){
    this.searchURL = 'https://api.spotify.com/v1/playlists/'+this.masterPlaylistID+"/tracks";
    return this.http.get(this.searchURL, this.httpOptions)
      .pipe(map(res => res));
  }

  removeTracks(){

  }

}
