import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../pages/modelos/post';

@Injectable()
export class PiusServiceProvider {

  private apiUrl = "http://piupiuwer.polijunior.com.br/api"

  constructor(private _http: HttpClient) {}

  listaPius(){
    return this._http.get<Post[]>(this.apiUrl + '/pius')
  }

  deletaPiu(id){
    this._http.delete<Post>(this.apiUrl +'/api/usuarios/' + id )
  }

  listaPiusUsuario(id){
    return this._http.get<Post[]>(this.apiUrl + '/pius?usuario=' + id)
  }

  criaPiu(post){
    let body = {
      "favoritado": false,
      "conteudo": post.conteudo,
      "data": post.data
    }
    return this._http.post<Post>(this.apiUrl + "/pius", body)
  }
}
