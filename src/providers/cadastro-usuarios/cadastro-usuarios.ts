import { HttpClient, HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CadastroUsuariosProvider {

  private apiUrl = 'http://piupiuwer.polijunior.com.br/api'
  constructor(private _http: HttpClient) {
  }

  postaCadastro(novoUser){
    console.log(novoUser.senha);
  
    let body = {
      "username": novoUser.username,
      "password": novoUser.senha,
      "first_name": novoUser.nome,
      "last_name": novoUser.sobrenome,
      "email": novoUser.email
    }

    return this._http.post(this.apiUrl + '/usuarios/registrar/', body)
    
    // return this._http.post(this.apiUrl + '/usuarios/registrar/', JSON.stringify(novoUser), {
    //   headers: new HttpHeaders().set("Content-Type", 'application/json'),
    //   params: new HttpParams()
    //   .set("username", novoUser.username)
    //   .set("password", novoUser.senha)
    //   .set("first_name", novoUser.nome)
    //   .set("last_name",novoUser.sobrenome)
    //   .set("email", novoUser.email)
    // })
  }
}  
