import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes : Routes = [
	{
		path : '',
		component : UsersComponent,
		children : [
			{ path : ':id', component : UserDetailComponent }
		]
	}
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
