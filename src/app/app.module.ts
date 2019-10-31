import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { PiusServiceProvider } from '../providers/pius-service/pius-service';
import { CadastroUsuariosProvider } from '../providers/cadastro-usuarios/cadastro-usuarios';

import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { AlertServiceProvider } from '../providers/alert-service/alert-service'; 
import { LogAutomaticoPage } from '../pages/log-automatico/log-automatico';
import { MyPage } from '../pages/my/my';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    LoginPage,
    LogAutomaticoPage,
    MyPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'PiuPiuwerApp',
      storeName: 'usuarios',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    LoginPage,
    LogAutomaticoPage,
    MyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PiusServiceProvider,
    CadastroUsuariosProvider,
    UsuariosServiceProvider,
    AlertServiceProvider,
  ]
})
export class AppModule {}
