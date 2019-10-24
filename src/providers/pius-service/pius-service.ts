import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../pages/modelos/post';

@Injectable()
export class PiusServiceProvider {

  constructor(private _http: HttpClient) {}

  lista(){
    return this._http.get<Post[]>('')

  }
}
