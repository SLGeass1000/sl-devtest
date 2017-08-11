export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap, NavigationExtras } from '@angular/router';

/*
@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }
*/

@Injectable()
export class RouterStub {
	navigateByUrl (url: string) { return url; }
  navigate(commands: any[], extras?: NavigationExtras) { }
}


@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParam));
  public param = this.subject.asObservable();

  // Test parameters
  private _testParam: ParamMap;
  get testParam() { return this._testParam; }
  set testParam(params: {}) {
    this._testParam = convertToParamMap(params);
    this.subject.next(this._testParam);
  }
}
