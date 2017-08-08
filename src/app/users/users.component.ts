import { Component, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { AppActions } from '../actions/app.actions';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { UsersService } from './users.service';

/* App Interfaces and Classes */
import { IRUsers } from '../shared/interfaces/users.interface';

@Component({
	moduleId : module.id,
	selector : 'sl-users',
	templateUrl : 'users.component.html',
	styleUrls : [ 'users.component.scss' ]
})
export class UsersComponent implements OnInit, OnDestroy {

	/* Subscriptions */
	private subscription : Array<Subscription> = [];

  constructor(private ngRedux : NgRedux<any>,
							private appActions : AppActions,
							private logger : LoggerService,
						 	private usersService : UsersService) { }

  ngOnInit () {
		this.getUserList();
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
  }

	getUserList () {
		let sub : Subscription = null;
		sub = this.usersService.getUserList().subscribe(
			(data : IRUsers) => {
				if (data) {
					this.ngRedux.dispatch(this.appActions.setUsers(data));
				}
			}
		);
		this.subscription.push(sub);
	}

}
