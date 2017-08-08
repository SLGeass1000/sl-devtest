import { NgModule } from '@angular/core';

/* App Feature - Module */
import { SharedModule } from '../shared/shared.module';

/* Routing Module */
import { UsersRoutingModule } from './users-routing.module';

/* App Feature - Component */
import { UsersComponent } from './users.component';

/* App Feature - Service */
import { UsersService } from './users.service';

@NgModule({
  imports : [
		SharedModule,
		UsersRoutingModule
  ],
  declarations : [
		UsersComponent
	],
	providers : [
		UsersService
	]
})
export class UsersModule { }
