import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {Pais, PaisesSmall} from "../interfaces/paises.interface";


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v2';
  private baseUrlV3: string = 'https://restcountries.com/v3.1';

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];


  get regiones(): string[]{
    return [ ...this._regiones ];
  }
  constructor( private  http: HttpClient) { }


  getPaisesPorRegion( region: string ): Observable<PaisesSmall[]>{
    const url : string = `${ this.baseUrlV3 }/region/${ region }/?fields=cca3,name`
    return this.http.get<PaisesSmall[]>( url );
  }


  getPaisPorCodigo( codigo: string ): Observable<Pais | null>{

    if(!codigo){
      return of(null)
    }
    const url : string = `${ this.baseUrl }/alpha/${ codigo }`

    return this.http.get<Pais>( url );
  }



}
