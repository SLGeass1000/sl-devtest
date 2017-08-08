import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgReduxModule } from '@angular-redux/store';

/* Feature Modules */
import { CoreModule } from './core/core.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* App Root */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

/* App Root - Actions */
import { AppActions } from './actions/app.actions';

@NgModule({
  imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		NgReduxModule,
		/* Feature Modules */
		/* Main App Router */
		AppRoutingModule
	],
  declarations: [
		AppComponent,
		NotFoundComponent
	],
	providers: [
		AppActions
	],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
