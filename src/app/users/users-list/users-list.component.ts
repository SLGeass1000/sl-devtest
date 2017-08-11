import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { AppActions } from '../../actions/app.actions';
import 'rxjs/add/operator/combineLatest';

/* App Services */
import { LoggerService } from '../../core/logger.service';

/* App Interfaces and Classes */
import { IRUsers, IUser } from '../../shared/interfaces/users.interface';
import { IClientCoord } from '../../shared/interfaces/app.interface';

@Component({
	moduleId : module.id,
  selector : 'sl-users-list',
  templateUrl : 'users-list.component.html',
  styleUrls : [ 'users-list.component.scss' ]
})
export class UsersListComponent implements OnInit, OnDestroy {
	public activeField : string = 'id';

	/* Subscriptions */
	private subscription : Array<Subscription> = [];
	/* Redux */
	@select(['state', 'users']) stateUsers$ : Observable<IRUsers>;
	public stateUsers : IRUsers;
	@select(['state', 'activeUserId']) activeUserId$ : Observable<number>;
	public activeUserId : number = null;

  constructor(private router : Router,
							private ngRedux : NgRedux<any>,
							private appActions : AppActions,
							private logger : LoggerService) { }

  ngOnInit () {
		let sub : Subscription = null;
		sub = this.stateUsers$.combineLatest(this.activeUserId$).subscribe((data) => {
			this.stateUsers = data[0];
			this.logger.info(`${this.constructor.name} - stateUsers:`, this.stateUsers);
			this.activeUserId = data[1];
		});
		this.subscription.push(sub);
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
  }


	/**
	 * onClickSelectUser - handle @click event and one call modal window with user info
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {void}
	 */
	onClickSelectUser (event : MouseEvent) : void {
		const methodName : string = 'onClickSelectUser';

		const el : Element = (<HTMLElement>event.target).closest('tr');
		if (!el) {
			this.logger.info(`${this.constructor.name} - ${methodName}:`, 'Not navigation element');
			return;
		}
		const userId : string = el.getAttribute('data-id').toString();
		this.logger.info(`${this.constructor.name} - ${methodName}:`, 'userId -', userId);

		const coord : IClientCoord = {
			x : event.clientX,
			y : event.clientY
		};
		this.ngRedux.dispatch(this.appActions.setClientCoord(coord));

		this.router.navigate(['users', userId]);
	}
}
