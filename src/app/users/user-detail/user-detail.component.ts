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
  selector : 'sl-user-detail',
  templateUrl : 'user-detail.component.html',
  styleUrls : [ 'user-detail.component.scss' ]
})
export class UserDetailComponent implements OnInit, OnDestroy {

	/* Subscriptions */
	private subscription : Array<Subscription> = [];
	/* Redux */

  constructor(private ngRedux : NgRedux<any>,
							private appActions : AppActions,
							private logger : LoggerService) { }

  ngOnInit () {
  }
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
  }

}
