import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Post } from '../../pages/modelos/post';
import { HttpErrorResponse } from '@angular/common/http';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { NavLifeCycles } from './utilidades/ionic/nav/nav-lifecycles';
import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements NavLifeCycles {

  public posts: Post[];
  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, 
    private _piusService: PiusServiceProvider,
    ) {}

  ionViewDidLoad() {
    // FEEDBACK VISUAL DE CARREGAMAENTO
    let loading = this._loadingCtrl.create({
      content: "Carregando os pius"
    })
    loading.present();
    // CARREGANDO OS POSTS DO SERVIDOR
    this._piusService.lista()
    .subscribe(
      (posts) => {
        this.posts = posts;
      loading.dismiss();
      },
    // CASO DÊ ERRO COM A CONEXÃO:
      (err: HttpErrorResponse) => {
        console.log(err);
        loading.dismiss();
        this._alertCtrl.create({
          title: "Falha na conexão com o servidor",
          subTitle: "Não foi possível carregar os pius dessa vez :(",
          buttons: [
            {text: "Ok"}
          ]
        }).present();
      } 
    )    
  }
  fazerLogin(){
    this.navCtrl.push(LoginPage);
  }
  fazerCadastro(){
    this.navCtrl.push(CadastroPage);
  }


}
