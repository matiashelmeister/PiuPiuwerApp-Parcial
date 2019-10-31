import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Post } from '../../pages/modelos/post';
import { HttpErrorResponse } from '@angular/common/http';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { NavLifeCycles } from './utilidades/ionic/nav/nav-lifecycles';
import { LoginPage } from '../login/login';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { MyPage } from '../my/my';
import { Usuario } from '../modelos/usuario';
import { Storage } from '@ionic/storage'
import { useAnimation } from '@angular/core/src/animation/dsl';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements NavLifeCycles {

  public posts:Post[] = []
  public usuario: Usuario
  public textoPost: string = ''

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertService:AlertServiceProvider,
    private _piusService: PiusServiceProvider,
    private _usuariosService: UsuariosServiceProvider,
    public navParams: NavParams,
    public _storage: Storage
    ) {
      this.posts = []
      this._storage.get("CredenciaisUsuario").then((usuarioSalvo) =>{
        console.log(usuarioSalvo);

      })    

    }

  ionViewDidLoad() {
    // FEEDBACK VISUAL DE CARREGAMAENTO
    let loading = this._loadingCtrl.create({
      content: "Carregando os pius"
    })
    loading.present();

    // CARREGANDO OS POSTS DO SERVIDOR
    this._piusService.listaPius()
    .subscribe(
      (posts) => {
        console.log(posts);
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

  minhaPagina(){
    this._storage.get("CredenciaisUsuario").then((usuarioSalvo) =>{
      console.log(usuarioSalvo.id);
      this._usuariosService.infoUsuario(usuarioSalvo.id).subscribe((user)=>{
        let usuarioLogado = user;
        console.log(usuarioLogado)
        this.navCtrl.push(MyPage,{
          usuarioSelecionado: usuarioLogado
        })  
      })
    },
    (err) => {
      console.log(err);
      this._alertService.criaAlerta("Falha na conexão com o servidor","Não foi possível carregar a sua página:(")
    }); 
  }

  visitaUsuario(i){
    console.log(this.posts[i]);
    this.navCtrl.push(MyPage,{
      usuarioSelecionado: this.posts[i].usuario,
    });
    
  }
  fazerLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  
  removePost(i:number){
    console.log("removido")   
    // AUTENTICAR SE O USUÁRIO PODE DELETAR
    this._piusService.deletaPiu(i)
  }

  destacaPost(i:number){
    // MUDAR ESTILO
    this.posts[i].favoritado = !this.posts[i].favoritado
    // MUDAR DE POSIÇÃO
    if (this.posts[i].favoritado == true){
      this.posts.splice(0,0,this.posts.splice(i,1)[0]);
      return this.posts
    }
    else if (this.posts[i].favoritado == false){
      console.log("E agora?")
    }
  }
}
