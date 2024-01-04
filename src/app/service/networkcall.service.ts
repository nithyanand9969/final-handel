  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class NetworkcallService {

    constructor(public httpClient: HttpClient) {}

    createCorporateRegi(formData: FormData): Observable<any> {
      return this.httpClient.post('http://localhost:8080/auth/uploadFileAndUser', formData);
    }

    createTraderRegi(traderReg: FormData): Observable<Object> {
      return this.httpClient.post('http://localhost:8080/trader/uploadFileAndUserTrader', traderReg);
    }

    createintermediaters(intermediaters:FormData):Observable<object>{
      return this.httpClient.post('http://localhost:8080/intermediary/uploadFileAndUserIntermediary', intermediaters);
    }
    createDomesticMaterial(domasticematerial: FormData): Observable<Object> {
      return this.httpClient.post('http://localhost:8080/material/domesticMaterial', domasticematerial);
    }
    createInternationalMaterial(internationalamaterial: FormData): Observable<Object> {
      return this.httpClient.post('http://localhost:8080/material/internationalMaterial', internationalamaterial);
    }
   
    
  

    getCorporateUser(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:8080/home/adminUser');
    }

    getTraderDetails(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:8080/home/adminUser');
    }

    getIntermediatorDetails(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:8080/home/adminUser');
    }
    getTotalUsers(): Observable<number> {
      return this.httpClient.get<number>('http://localhost:8080/home/totalCount');
    }
    getTotalcorporateCount():Observable<number>{
      return this.httpClient.get<number>('http://localhost:8080/home/corporateCount');
    }
    getTotaltraderCount():Observable<number>{
      return this.httpClient.get<number>('http://localhost:8080/home/traderCount');
    }
    getTotalintermediaryCount():Observable<number>{
      return this.httpClient.get<number>('http://localhost:8080/home/intermediaryCount');
    }

  }
