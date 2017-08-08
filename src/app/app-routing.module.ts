import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App Routing - Component */
import { NotFoundComponent } from './not-found/not-found.component';

const routes : Routes = [
	{ path: '', redirectTo: '/users', pathMatch: 'full' },
	{ path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
	{ path: '404', component: NotFoundComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
