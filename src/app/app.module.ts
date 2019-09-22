import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ForcedFocusDirective } from './terminal/forced-focus.directive';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    ForcedFocusDirective,
    SafePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
