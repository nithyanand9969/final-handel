  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class NetworkcallService {

  
    private baseUrl: string = 'http://localhost:8008';
    constructor(public httpClient: HttpClient) {}

    createCorporateRegi(formData: FormData): Observable<any> {
      return this.httpClient.post(`${this.baseUrl}/auth/uploadFileAndUser`, formData);
    }

    createTraderRegi(traderReg: FormData): Observable<Object> {
      return this.httpClient.post('${this.baseUrl}/trader/uploadFileAndUserTrader', traderReg);
    }

    createintermediaters(intermediaters:FormData):Observable<object>{
      return this.httpClient.post('${this.baseUrl}/intermediary/uploadFileAndUserIntermediary', intermediaters);
    }
    createDomesticMaterial(domasticematerial: FormData): Observable<Object> {
      return this.httpClient.post('${this.baseUrl}/material/domesticMaterial', domasticematerial);
    }
    createInternationalMaterial(internationalamaterial: FormData): Observable<Object> {
      return this.httpClient.post('${this.baseUrl}/material/internationalMaterial', internationalamaterial);
    }
   
    
  

    getCorporateUser(): Observable<any[]> {
      return this.httpClient.get<any[]>('${this.baseUrl}/home/adminUser');
    }

    getTraderDetails(): Observable<any[]> {
      return this.httpClient.get<any[]>('${this.baseUrl}/home/adminUser');
    }

    getIntermediatorDetails(): Observable<any[]> {
      return this.httpClient.get<any[]>('${this.baseUrl}/home/adminUser');
    }
    getTotalUsers(): Observable<number> {
      return this.httpClient.get<number>('${this.baseUrl}/home/totalCount');
    }
    getTotalcorporateCount():Observable<number>{
      return this.httpClient.get<number>('${this.baseUrl}/home/corporateCount');
    }
    getTotaltraderCount():Observable<number>{
      return this.httpClient.get<number>('${this.baseUrl}/home/traderCount');
    }
    getTotalintermediaryCount():Observable<number>{
      return this.httpClient.get<number>('${this.baseUrl}/home/intermediaryCount');
    }

  }
