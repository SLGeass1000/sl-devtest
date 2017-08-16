import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { By } from '@angular/platform-browser';

/* Interfaces */
import { IUser } from '../../shared/interfaces/users.interface';
import { IAction } from '../../shared/interfaces/action.interface';

/* Components */
import { UserDetailComponent } from './user-detail.component';

/* Services */
import { AppActions } from '../../actions/app.actions';

/* Stubs */
import { Router, RouterStub, ActivatedRoute, ActivatedRouteStub} from '../../../testing/router.stub';
import { NgRedux, NgReduxStub } from '../../../testing/redux.stub';
import { LoggerService, LoggerServiceStub } from '../../../testing/logger.stub';

/* Mocks */
import { users } from '../../../testing/users.mock';

/**
 * setMockNgRedux - perform setup the redux store for UserDetailComponent
 *
 * @param {ComponentFixture<T>} fixture - fixture component T
 * @param {IClientCoord} coord - client coordinates are received from @click event
 * @param {Array<IUser>} arrUsers - array with user info
 * @return {void}
 */
function setMockNgRedux<T>(fixture : ComponentFixture<T>, arrUsers : Array<IUser>) : void {
	const selUsersStub = MockNgRedux.getSelectorStub(['state', 'users']);
	selUsersStub.next(arrUsers);
	selUsersStub.complete();
}

/**
 * checkUserTemplate - perform unit testing template to verify the correctness
 *
 * @param {ComponentFixture<T>} fixture - fixture component T
 * @param {IUser} user - user info
 * @return {void}
 */
function checkUserTemplate<T>(fixture : ComponentFixture<T>, user : IUser) {
	const des : Array<DebugElement> = fixture.debugElement.queryAll(By.css('tr td:last-child'));
	const els : Array<HTMLElement> = des.map((de : DebugElement) => de.nativeElement);
	const elId : HTMLElement = fixture.debugElement.query(By.css('h2 span.userId')).nativeElement;
	expect(elId.textContent).toBe(user.id.toString());
	expect(els[0].textContent).toBe(user.name);
	expect(els[1].textContent).toBe(user.username);
	expect(els[2].textContent).toBe(user.email);
	expect(els[3].textContent).toBe(user.phone);
	expect(els[4].textContent).toBe(user.website);
	expect(els[5].textContent).toBe(user.address.street);
	expect(els[6].textContent).toBe(user.address.suite);
	expect(els[7].textContent).toBe(user.address.city);
	expect(els[8].textContent).toBe(user.address.zipcode);
	expect(els[9].textContent).toBe(user.address.geo.lat);
	expect(els[10].textContent).toBe(user.address.geo.lng);
	expect(els[11].textContent).toBe(user.company.name);
	expect(els[12].textContent).toBe(user.company.catchPhrase);
	expect(els[13].textContent).toBe(user.company.bs);
}

describe('UserDetailComponent', () => {
  let component : UserDetailComponent;
  let fixture : ComponentFixture<UserDetailComponent>;
	/* Services */
	let ngRedux : NgRedux<any>;
	let router : Router;
	/* Spys */
	let spyDispatch : jasmine.Spy;
	let spyNavigateByUrl : jasmine.Spy;
	let activatedRoute : ActivatedRouteStub;

  beforeEach(async(() => {
		MockNgRedux.reset();
		activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [ UserDetailComponent ],
			providers: [
	      { provide: Router, useClass: RouterStub },
				{ provide: ActivatedRoute, useValue: activatedRoute },
				{ provide: NgRedux, useClass: NgReduxStub },
				{ provide: AppActions, useClass: AppActions },
				{ provide: LoggerService, useClass: LoggerServiceStub }
	    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;

		ngRedux = fixture.debugElement.injector.get(NgRedux);
		spyDispatch = spyOn(ngRedux, 'dispatch');
		router = fixture.debugElement.injector.get(Router);
		spyNavigateByUrl = spyOn(router, 'navigateByUrl');
  });

	it('should not show modal window without route param', () => {
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		const deModal : DebugElement = fixture.debugElement.query(By.css('.modal'));
		expect(deModal).toBeFalsy('Modal must not be opened without route param');
  });

	it('should not show modal window without users data', () => {
		activatedRoute.testParamMap = { id : 2 };
		setMockNgRedux(fixture, null);
		fixture.detectChanges();

		const deModal : DebugElement = fixture.debugElement.query(By.css('.modal'));
		expect(deModal).toBeFalsy('Modal must not be opened without users data');
	});

	it('should not show modal window for user with ID equal "asdfg"', () => {
		activatedRoute.testParamMap = { id : 'asdfg' };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		const deModal : DebugElement = fixture.debugElement.query(By.css('.modal'));
		expect(deModal).toBeFalsy('Modal must not be opened for user with ID equal "asdfg"');
		expect(spyDispatch.calls.any()).toBeTruthy('Method dispatch must called');
		expect(spyNavigateByUrl.calls.any()).toBeTruthy('Method navigateByUrl must called');
  });

	it('should not show modal window for user with ID equal "-1"', () => {
		activatedRoute.testParamMap = { id : '-1' };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		const deModal : DebugElement = fixture.debugElement.query(By.css('.modal'));
		expect(deModal).toBeFalsy('Modal must not be opened for user with ID equal "-1"');
		expect(spyDispatch.calls.any()).toBeTruthy('Method dispatch must called');
		expect(spyNavigateByUrl.calls.any()).toBeTruthy('Method navigateByUrl must called');
	});

	it('should show modal window for user with ID equal "2"', () => {
		activatedRoute.testParamMap = { id : 2 };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		const deModal : DebugElement = fixture.debugElement.query(By.css('.modal'));
		expect(deModal).toBeTruthy('Modal must be opened for user with ID equal "2"');
		expect(spyDispatch.calls.any()).toBeTruthy('Method dispatch must called');
		expect(spyNavigateByUrl.calls.any()).toBeFalsy('Method navigateByUrl must not called');
	});

	it('should display correct data after page has loaded', () => {
		let userId : number, user : IUser;
		setMockNgRedux(fixture, users);

		userId = 1;
		activatedRoute.testParamMap = { id : userId };
		fixture.detectChanges();
		user = users[0];
		checkUserTemplate(fixture, user);
	});

	it('should display correct data after new user has been selected', () => {
		let userId : number, user : IUser;
		setMockNgRedux(fixture, users);

		userId = 1;
		activatedRoute.testParamMap = { id : userId };
		fixture.detectChanges();
		userId = 2;
		activatedRoute.testParamMap = { id : userId };
		fixture.detectChanges();
		user = users[1];
		checkUserTemplate(fixture, user);
	});

	it('should call ngRedux.dispatch 2 times in the OnInit event', async(() => {
		let argAction : IAction;

		activatedRoute.testParamMap = { id : 2 };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		expect(spyDispatch.calls.count()).toBe(2);
		const calls : jasmine.CallInfo[] = spyDispatch.calls.all();
		const callOpenModal : jasmine.CallInfo = calls[0];
		const callSetActiveUserId : jasmine.CallInfo = calls[1];

		argAction = (<IAction>callOpenModal.args[0]);
		expect(argAction.type).toBe('AppActions:OPEN_MODAL');
		expect(argAction.payload.name).toBe('user-detail');
		expect(argAction.payload.state).toBeTruthy();

		argAction = (<IAction>callSetActiveUserId.args[0]);
		expect(argAction.type).toBe('AppActions:SET_ACTIVE_USER_ID');
		expect(argAction.payload.id).toBe(2);
	}));

	it('should call ngRedux.dispatch 2 times when close buttun (or ovelay) was clicked', async(() => {
		activatedRoute.testParamMap = { id : 2 };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		spyDispatch.calls.reset();
		const deModalOverlay : DebugElement = fixture.debugElement.query(By.css('.modal-overlay'));
		deModalOverlay.nativeElement.click();
		expect(spyDispatch.calls.count()).toBe(2);

		spyDispatch.calls.reset();
		const deModalClose : DebugElement = fixture.debugElement.query(By.css('.modal-close'));
		deModalClose.nativeElement.click();
		expect(spyDispatch.calls.count()).toBe(2);
	}));

	it('should call ngRedux.dispatch 2 times with correct args when modal is closing', async(() => {
		let argAction : IAction;

		activatedRoute.testParamMap = { id : 2 };
		setMockNgRedux(fixture, users);
		fixture.detectChanges();

		spyDispatch.calls.reset();
		const deModalClose : DebugElement = fixture.debugElement.query(By.css('.modal-close'));
		deModalClose.nativeElement.click();
		expect(spyDispatch.calls.count()).toBe(2);
		const calls : jasmine.CallInfo[] = spyDispatch.calls.all();
		const callCloseActiveModal : jasmine.CallInfo = calls[0];
		const callSetActiveUserId : jasmine.CallInfo = calls[1];

		argAction = (<IAction>callCloseActiveModal.args[0]);
		expect(argAction.type).toBe('AppActions:CLOSE_ACTIVE_MODAL');

		argAction = (<IAction>callSetActiveUserId.args[0]);
		expect(argAction.type).toBe('AppActions:SET_ACTIVE_USER_ID');
		expect(argAction.payload.id).toBeNull();
	}));
});
