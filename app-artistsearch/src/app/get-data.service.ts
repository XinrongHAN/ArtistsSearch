import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GetDataService {
  artistname: string
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  // getArtists(artistname: string): Observable<any> {
  //   return this.http.get('http://localhost:8080/artists?q=' + artistname)
  // }

  // getInfo(artistid: string): Observable<any> {
  //   return this.http.get('http://localhost:8080/info?id=' + artistid)
  // }

  // getArtworks(id: string): Observable<any> {
  //   return this.http.get('http://localhost:8080/artwork?id=' + id)
  // }

  // getGenes(artwork_id: string): Observable<any> {
  //   return this.http.get('http://localhost:8080/genes?artwork_id=' + artwork_id)
  // }

  getArtists(artistname: string): Observable<any> {
    return this.http.get('https://hxr571python78987.wl.r.appspot.com/artists?q=' + artistname)
  }

  getInfo(artistid: string): Observable<any> {
    return this.http.get('https://hxr571python78987.wl.r.appspot.com/info?id=' + artistid)
  }

  getArtworks(id: string): Observable<any> {
    return this.http.get('https://hxr571python78987.wl.r.appspot.com/artwork?id=' + id)
  }

  getGenes(artwork_id: string): Observable<any> {
    return this.http.get('https://hxr571python78987.wl.r.appspot.com/genes?artwork_id=' + artwork_id)
  }

  constructor(
    private http: HttpClient,
  ) { }
}
