import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

/* App Feature - Service */
import { HttpService } from './http.service';
import { LoggerService, Options as OptionsLogger, Level } from './logger.service';

@NgModule({
  imports:      [
		CommonModule,
		HttpModule
	],
  declarations: [ ],
  exports:      [ ],
  providers:    [
		HttpService,
		{
			provide: OptionsLogger,
			useValue: { level: Level.LOG }
		},
		LoggerService
	]
})
export class CoreModule {
}
