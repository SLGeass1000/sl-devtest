import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

@Component({
	moduleId : module.id,
  selector : 'sl-user-detail',
  templateUrl : 'user-detail.component.html',
  styleUrls : [ 'user-detail.component.scss' ]
})
export class UserDetailComponent implements OnInit, OnDestroy {
	public user : IUser = null;

	/* Subscriptions */
	private subscription : Array<Subscription> = [];
	/* Redux */
	@select(['state', 'users']) stateUsers$ : Observable<IRUsers>;
	public stateUsers : IRUsers;

  constructor(private router : Router,
							private route : ActivatedRoute,
							private ngRedux : NgRedux<any>,
							private appActions : AppActions,
							private logger : LoggerService) { }

  ngOnInit () {
		let sub : Subscription = null;
		sub = this.route.params.combineLatest(this.stateUsers$).subscribe((data) => {
			if (!(data[0] && data[1])) {
				return;
			}
			this.stateUsers = data[1];
			const id : number = +data[0]['id'];
			if (!isFinite(id) || id < 1) {
				this.ngRedux.dispatch(this.appActions.setActiveUserId(null));
				this.router.navigateByUrl('/users');
				return;
			}
			this.ngRedux.dispatch(this.appActions.setActiveUserId(id));
			this.user = this.findUser(this.stateUsers, id);
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'UserId -', id);
		});
		this.subscription.push(sub);
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
  }

	/**
	 * findUser - find user structure with route id
	 *
	 * @kind {method}
	 * @param {Array<IUser>} arr - users list
	 * @param {number} id - user ID from route
	 * @return {IUser} - user
	 */
	findUser (arr : Array<IUser>, id : number) : IUser {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === id) {
				return arr[i];
			}
		}
		return null;
	}

	/**
	 * onClickCloseModal - handle @click event and one close modal window with user info
	 *
	 * @kind {event}
	 * @return {void}
	 */
	onClickCloseModal () : void {
		this.ngRedux.dispatch(this.appActions.setActiveUserId(null));
		this.router.navigateByUrl('/users');
	}
}
