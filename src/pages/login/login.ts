import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { Usuario } from '../modelos/usuario'
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Storage } from '@ionic/storage'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {
    username: "",
    senha: ""
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _alertService:AlertServiceProvider,
    private _storage:Storage) {

      this.loginAutomatico()
      }

  loginAutomatico(){
    this._storage.get("CredenciaisUsuario").then(
      (usuarioSalvo) => {
        console.log(usuarioSalvo);
        if (usuarioSalvo != undefined){
          this._usuariosService.logaUsuario(usuarioSalvo).subscribe(
            () => {
              this.navCtrl.setRoot(HomePage);
            }
          ),
          (err) => {
            console.log("AutoLogin não foi bem sucedido")
          }
        }
    })
  }
  fazerLogin(){

      console.log(this.user.username);
      
      this._usuariosService.logaUsuario(this.user).subscribe(
        (token) => {
          console.log(token);
          this.navCtrl.setRoot(HomePage);
          this._storage.set("CredenciaisUsuario",this.user).then()  
        } ,
        (err) => {
          if (err.error.username = "Unable to log in with provided credentials."){
            this._alertService.criaAlerta("Dados incorretos","Verifique se o usuário ou senha estão corretos")
          }
          else if (err.error.username = ""){
            this._alertService.criaAlerta("Preenchimento obrigatório","Você se esqueceu de preencher os campos")
          }
        })
      
    }  

  fazerCadastro(){
    this.navCtrl.push(CadastroPage);
  }

}
