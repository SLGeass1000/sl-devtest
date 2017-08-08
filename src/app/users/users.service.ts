import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config } from '../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { HttpService } from '../core/http.service';

/* App Interfaces and Classes */
import { IRUsers } from '../shared/interfaces/users.interface';

@Injectable()
export class UsersService implements OnDestroy {
	private headers : Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http : Http,
							private logger : LoggerService,
							private httpService : HttpService) {
		this.init();
	}
	init () {
	}
	ngOnDestroy () {
	}

	getUserList () : Observable<IRUsers | string> {
		const methodName : string = 'getUserList';

		return this.http.get(Config.gameUrl + 'users', { headers : this.headers })
			.map<Response, IRUsers>((resp : Response) => {
				return this.httpService.mapData<IRUsers>(resp, this.constructor.name, methodName);
			})
			.catch<any, string>((error) => this.httpService.handleError(error));
	}
}
