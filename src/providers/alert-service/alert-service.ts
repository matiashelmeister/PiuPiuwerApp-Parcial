import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertServiceProvider {

  public _alerta: Alert;

  constructor(public http: HttpClient,
    private _alertCtrl: AlertController) {}

  criaAlerta(titulo:string,subtitulo:string){

    this._alerta = this._alertCtrl.create({
      buttons: [
        {text: 'OK'}
      ]
    });

    this._alerta.setTitle(titulo);
    this._alerta.setSubTitle(subtitulo);
    this._alerta.present();
  }

}
