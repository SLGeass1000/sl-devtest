export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap, NavigationExtras } from '@angular/router';


@Component({
	selector: 'router-outlet', // tslint:disable-line
	template: ''
})
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {
	navigateByUrl (url : string) {
		return url;
	}
  navigate (commands : Array<any>, extras ?: NavigationExtras) {
		;
	}
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
	private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  public paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap : ParamMap;
  get testParamMap () {
		return this._testParamMap;
	}
  set testParamMap (params : { [ key : string ] : any }) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }
}
