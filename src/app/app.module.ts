import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:import-spacing
import { AuthModule } from  './auth/auth.module';
// import { ComponentsModule } from './components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NetworkService} from './services/networkservice.service';
import { Network } from '@ionic-native/network/ngx';
import { LoaderComponent } from './auth/loader.component';
import { ToastComponent } from './auth/toast.component';
import { RestService } from './services/rest.service';

@NgModule({
  declarations: [ AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
IonicModule.forRoot(), AppRoutingModule, AuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    NetworkService,
    NativeGeocoder,
    LoaderComponent,
    ToastComponent,
    RestService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
