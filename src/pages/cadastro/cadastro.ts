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
    first_name: '',
    last_name:'',
    username: '',
    email: '',
    senha: '',
    confirmasenha: '',
    id: null,
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
      this.novoUser.first_name == ""||
      this.novoUser.senha == ""||
      this.novoUser.last_name == ""||
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
            console.log("vrau");
            
            subtitulo= 'Vamos piar?'
            titulo = 'Cadastro bemn sucedido!'
            this._alertService.criaAlerta(titulo,subtitulo)
            this.navCtrl.setRoot(LoginPage)
            console.log(retorno)
          },
          (err) => {
            console.log(err)
            if (err.error.email = "Enter a valid email address."){
              subtitulo= 'Insira um e-mail adequado no respectivo campo'
              titulo = 'E-mail inválido'
              this._alertService.criaAlerta(titulo,subtitulo)  
            }
            else if (err.error.username = "A user with that username already exists."){
              subtitulo= 'Escolha um outro nome de usuário'
              titulo = 'Username já existe'
              this._alertService.criaAlerta(titulo,subtitulo)  
            }
// CONSERTAR ERRO DE EMAIL INVALIDO + USERNAME JA EXISTENTE
            // if (err.error.email = "Enter a valid email address."){
            //   subtitulo= 'E-mail inválido ou username já existente'
            //   titulo = 'Problema com e-mail ou username'
            //   this._alertService.criaAlerta(titulo,subtitulo)  
            // }


            else{
              subtitulo = 'Tente novamente mais tarde!'
              titulo = 'Falha no cadastro'
              this._alertService.criaAlerta(titulo,subtitulo)
          }}
        )      
    }
  }

  fazerLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}