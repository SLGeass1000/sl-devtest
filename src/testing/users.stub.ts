export { UsersService } from '../app/users/users.service';
export { UsersListComponent } from '../app/users/users-list/users-list.component';

import { Component, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/* Interfaces */
import { IRUsers } from '../app/shared/interfaces/users.interface';

/* Mocks */
import { users } from './users.mock';

@Injectable()
export class UsersServiceStub {
	constructor () {
	}

	getUserList () : Observable<IRUsers | string> {
		return Observable.of(users);
	}
}

@Component({
	selector: 'sl-users-list',
	template: ''
})
export class UsersListStubComponent {
}
