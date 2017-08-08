import { Component, Input, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { AppActions } from '../../actions/app.actions';

/* App Services */
import { LoggerService } from '../../core/logger.service';

/* App Interfaces and Classes */
import { IRUsers, IUser } from '../../shared/interfaces/users.interface';

@Component({
	moduleId : module.id,
  selector : 'sl-users-list',
  templateUrl : 'users-list.component.html',
  styleUrls : [ 'users-list.component.scss' ]
})
export class UsersListComponent implements OnInit, OnDestroy {
	public user : IUser = null;

	@Input('userId') userId : string = '1';

	/* Subscriptions */
	private subscription : Array<Subscription> = [];
	/* Redux */
	@select(['state', 'users']) stateUsers$ : Observable<IRUsers>;
	public stateUsers : IRUsers;

  constructor(private ngRedux : NgRedux<any>,
							private appActions : AppActions,
							private logger : LoggerService) { }

  ngOnInit() {
		this.subscription.push(this.stateUsers$.subscribe((data) => {
			this.stateUsers = data;
			this.logger.info(`${this.constructor.name} - stateUsers:`, this.stateUsers);
			if (this.stateUsers) {
				this.user = this.stateUsers[this.userId];
			}
		}));
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
  }

}
