import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-log-automatico',
  templateUrl: 'log-automatico.html',
})
export class LogAutomaticoPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _storage:Storage,
    private _usuariosService: UsuariosServiceProvider) {
  }

  ionViewDidLoad() {
    this._storage.get("CredenciaisUsuario").then(
      (usuarioSalvo) => {
        console.log(usuarioSalvo + "é o usuario salvo");
        if (usuarioSalvo != undefined || usuarioSalvo != null){
          this._usuariosService.logaUsuario(usuarioSalvo).subscribe(
            () => {
              console.log("Sucesso no login automatico");              
              this.navCtrl.setRoot(HomePage);
            }
          ),
          (err) => {
            console.log("AutoLogin não foi bem sucedido");
            console.log(err);
            this.navCtrl.setRoot(LoginPage);
          }
        }
        else{
          console.log("Não há um usuário salvo");          
          this.navCtrl.setRoot(LoginPage);
        }
    })

  }

}
