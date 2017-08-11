import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { By } from '@angular/platform-browser';

/* Components */
import { UsersListComponent } from './users-list.component';

/* Stubs */
import { Router, RouterStub } from '../../../testing/router.stub';
import { NgRedux, NgReduxStub } from '../../../testing/redux.stub';
import { LoggerService, LoggerServiceStub } from '../../../testing/logger.stub';
/* Mocks */
import { users } from '../../../testing/users.mock';

/* Local stubs */
import { AppActions } from '../../actions/app.actions';

class AppActionsStub {
}

describe('UsersListComponent', () => {
  let component : UsersListComponent;
  let fixture : ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
		MockNgRedux.reset();
    TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [ UsersListComponent ],
			providers: [
      { provide: Router, useClass: RouterStub },
			{ provide: NgRedux, useClass: NgReduxStub },
			{ provide: AppActions, useClass: AppActionsStub },
			{ provide: LoggerService, useClass: LoggerServiceStub }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });
	it('should show empty table', async(() => {
		const selActiveUserIdStub = MockNgRedux.getSelectorStub(['state', 'activeUserId']);
		selActiveUserIdStub.next(null);
		selActiveUserIdStub.complete();
		const selUsersStub = MockNgRedux.getSelectorStub(['state', 'users']);
		selUsersStub.next(null);
		selUsersStub.complete();
		fixture.detectChanges();
		const userRecors = fixture.debugElement.queryAll(By.css('table tbody tr'));
		expect(userRecors.length).toBe(0, 'Number of row (line) table need to equal 0');
	}));

	it('should show 2 table line', async(() => {
		const selActiveUserIdStub = MockNgRedux.getSelectorStub(['state', 'activeUserId']);
		selActiveUserIdStub.next(4);
		selActiveUserIdStub.complete();
		const selUsersStub = MockNgRedux.getSelectorStub(['state', 'users']);
		selUsersStub.next(users);
		selUsersStub.complete();
		fixture.detectChanges();
		const userRecors = fixture.debugElement.queryAll(By.css('table tbody tr'));
		expect(userRecors.length).toBe(2, 'Number of row (line) table need to equal 2');
	}));

});
