import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroUsuariosProvider } from '../../providers/cadastro-usuarios/cadastro-usuarios';
import { Usuario } from '../modelos/usuario';
import { LoginPage } from '../login/login';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public novoUser: Usuario = {
    nome: '',
    sobrenome:'',
    username: '',
    email: '',
    senha: '',
    confirmasenha: '',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cadastroUsuarios: CadastroUsuariosProvider,
    private _alertService: AlertServiceProvider,
    ){}

  fazCadastro(){

// CHECAR SE TODOS OS CAMPOS FORAM PREENCHIDOS
    let titulo = '';
    let subtitulo = '';
    if(
      this.novoUser.email == "" ||
      this.novoUser.nome == ""||
      this.novoUser.senha == ""||
      this.novoUser.sobrenome == ""||
      this.novoUser.username == ""||
      this.novoUser.confirmasenha == ""
    ){
      titulo = "Preenchimento obrigatório",
      subtitulo = "Todos os campos devem ser preenchidos",
      this._alertService.criaAlerta(titulo, subtitulo)
      return;
    }

// CHECAR SE A CONFIRMAÇÃO DE SENHA ESTÁ CORRETA

    else if (this.novoUser.senha != this.novoUser.confirmasenha){
      titulo = "Problema com senha",
      subtitulo = "Os campos de senha estão diferentes",
      this._alertService.criaAlerta(titulo,subtitulo)
      return;
    }  

    else {
      
// CAPTAR DADOS PREENCHIDOS

  // VERIFICAR SE O CADASTRO FOI BEM SUCEDIDO
      this._cadastroUsuarios.postaCadastro(this.novoUser)
        .subscribe(
          (retorno) => {
            subtitulo= 'Vamos piar?'
            titulo = 'Cadastro bem sucedido!'
            this._alertService.criaAlerta(titulo,subtitulo)
            this.navCtrl.setRoot(LoginPage)
            console.log(retorno)
          },
          (err) => {
            subtitulo = 'Tente novamente mais tarde!'
            titulo = 'Falha no cadastro'
            this._alertService.criaAlerta(titulo,subtitulo)
            console.log(err)
          }
        )
      console.log(this.novoUser);
      

    }

  }
}