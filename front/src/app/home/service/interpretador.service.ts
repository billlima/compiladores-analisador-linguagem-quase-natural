import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterpretadorService {

  private readonly PATH: string = "interpretador";

  constructor(private http: HttpClient) { }

  interpretar(texto: string): Observable<any> {
    console.log('teste');
    console.log(env.baseApiUrl + this.PATH);
    return this.http.post(env.baseApiUrl + this.PATH, { texto: texto });
  }

}
