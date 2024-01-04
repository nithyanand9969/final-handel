import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraderService {

  constructor(private http:HttpClient) { }


  traderSignUp(data: any) {
    
    return this.http.post('http://localhost:3000/createtrader',data);

  }

}
