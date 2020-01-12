import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

//Rutas
import { APP_ROUTES } from "./app.routes";

//Modulos
import { PagesModule } from "./pages/pages.module";

//Servicios
import { ServiceModule } from "./services/service.module";

//Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";


@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
