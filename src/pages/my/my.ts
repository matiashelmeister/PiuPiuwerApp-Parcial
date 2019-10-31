import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Usuario } from '../modelos/usuario';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Post } from '../modelos/post';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  public usuario: Usuario;
  public posts: Post[] =[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _piusService: PiusServiceProvider,
    private _alertService: AlertServiceProvider) {  
      this.usuario = this.navParams.get("usuarioSelecionado");      
           }

  ionViewDidLoad(){
    // FEEDBACK VISUAL DE CARREGAMAENTO
      let loading = this._loadingCtrl.create({
        content: "Carregando os pius"
      })
      loading.present();

      // CARREGA PIUS DO USUÁRIO
      this._piusService.listaPiusUsuario(this.usuario.id)
      .subscribe(
        (posts) => {
          console.log(posts);
          console.log(posts.length)
          loading.dismiss();
          this.posts = posts
        },
      // CASO DÊ ERRO COM A CONEXÃO:
        (err: HttpErrorResponse) => {
          console.log(err);
          loading.dismiss();
          this._alertService.criaAlerta("Falha na conexão com o servidor","Não foi possível carregar os pius dessa vez :(")
        })    
  
  }
  fazerLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
