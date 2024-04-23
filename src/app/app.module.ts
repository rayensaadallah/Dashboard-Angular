import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UserComponent } from './pages/user/user.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { ServicesComponent } from './pages/services/services.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PrestatairesComponent } from './pages/prestataires/prestataires.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    NotAuthorizedComponent,
    ClientsComponent,
    ServicesComponent,
    OrdersComponent,
    PrestatairesComponent,
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass: AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
