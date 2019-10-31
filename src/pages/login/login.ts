import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { Storage } from '@ionic/storage'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public globalToken;
  public decodedJSON;
  public email;
  public userID;
  public username;

  public user = {
    username: "",
    senha: "",
    id: "",
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _alertService:AlertServiceProvider,
    private _storage:Storage) {
    }

  
  tokenDecode() {
    const token = this.globalToken;
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.decodedJSON = JSON.parse(payload);
      this.userID = this.decodedJSON['user_id'];
      this.username = this.decodedJSON['username'];
      this.email = this.decodedJSON['email']
      return true;
    } else {
      return false;
    }
  }
  fazerLogin(){
      this._usuariosService.logaUsuario(this.user).subscribe(
        (token) => {
          this.globalToken = token["token"]
          this.tokenDecode()
          this.navCtrl.setRoot(HomePage);
          this.user.id = this.userID;
          this._storage.set("CredenciaisUsuario",this.user).then();
        } ,
        (err) => {
          if (err.error.username = "Unable to log in with provided credentials."){
            this._alertService.criaAlerta("Dados incorretos","Verifique se você preencheu corretamente os campos indicados")
          }
        })
      
    }  

  fazerCadastro(){
    this.navCtrl.push(CadastroPage);
  }

}
