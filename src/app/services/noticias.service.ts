import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = 'https://newsapi.org/v2/';
const headers = new HttpHeaders({
  'X-api-key': apiKey,
});

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  pageTitulares = 0;
  pageCategorias = 0;
  categoriaActual: string = null;
  constructor(private httpclient: HttpClient) {}
  // constructor(private htt:HttpClient) { }
  private ejecutarServicio<t>(query: string) {
    query = apiUrl + query;
    return this.httpclient.get<t>(query, { headers });
  }

  getTitulares() {
    this.pageTitulares++;
    console.log(this.pageTitulares);
    // return this.ejecutarServicio<any>('top-headlines?country=us');
    return this.ejecutarServicio<Respuesta>(
      `top-headlines?country=us&page=${this.pageTitulares}`
    );
  }

  getCategorias(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.pageCategorias++;
    } else {
      this.pageCategorias = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarServicio<Respuesta>(
      `top-headlines?country=us&category=${categoria}&page=${this.pageCategorias}`
    );
  }
}
