export { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class NgReduxStub {
	configureStore () : void {
		return;
	}
	dispatch () : void {
		return;
	}
  select () : Observable<any> {
		return Observable.of(null);
	}
}
