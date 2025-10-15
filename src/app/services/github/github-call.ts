import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GithubUser {
  followers: number;
  login: string;
  public_repos: number;
  blog: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubCall {
  constructor(private http: HttpClient) {}

  getData() {
    let response = this.http.get<GithubUser>('https://api.github.com/users/JeronimoV');
    return response as Observable<GithubUser>;
}}