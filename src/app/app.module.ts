import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { SelectComponent } from './components/select/select.component';
import { CreateComponent } from './components/create/create.component';
import { StartComponent } from './components/start/start.component';
import { HomeComponent } from './components/home/home.component';
import { StatsComponent } from './components/stats/stats.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ReviewComponent } from './components/review/review.component';

import { SpotifyService } from './services/spotify.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    InstructionsComponent,
    SelectComponent,
    CreateComponent,
    StartComponent,
    HomeComponent,
    StatsComponent,
    ChooseComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SpotifyService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
