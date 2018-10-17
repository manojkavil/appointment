import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  API_URL = 'http://localhost:55512/api';
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/values`)
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPing1(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/values`, {
      headers: new HttpHeaders()
        .set('Authorization', `bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => {this.message = error;
          console.log('auth error: ', error);
        }
        
      );
  }
  public securedPing(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/values/1`, {
      headers: new HttpHeaders()
        .set('Authorization', `bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => {this.message = error;
          console.log('auth error: ', error);
        }
        
      );
  }
}
