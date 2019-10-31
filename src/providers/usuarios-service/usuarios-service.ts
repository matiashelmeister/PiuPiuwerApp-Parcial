import { HttpClient, HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosServiceProvider {

  private apiUrl = "http://piupiuwer.polijunior.com.br/api"


  constructor(private _http: HttpClient
    ) {}

  logaUsuario(usuario){
    return this._http.post(this.apiUrl + "/login/", JSON.stringify(usuario), {
      headers: new HttpHeaders().set("Content-Type", 'application/json'),
      params: new HttpParams()
      .set("username", usuario.username)
      .set("password",usuario.senha)
    })
  }

  infoUsuario(id){
    return this._http.get(this.apiUrl + '/usuarios/' + id)
  }
}