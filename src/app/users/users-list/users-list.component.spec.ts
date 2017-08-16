import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { By } from '@angular/platform-browser';

/* Interfaces */
import { IUser } from '../../shared/interfaces/users.interface';

/* Components */
import { UsersListComponent } from './users-list.component';

/* Services */
import { AppActions } from '../../actions/app.actions';

/* Stubs */
import { Router, RouterStub } from '../../../testing/router.stub';
import { NgRedux, NgReduxStub } from '../../../testing/redux.stub';
import { LoggerService, LoggerServiceStub } from '../../../testing/logger.stub';

/* Mocks */
import { users } from '../../../testing/users.mock';

/**
 * setMockNgRedux - perform setup the redux store for UsersListComponent
 *
 * @param {ComponentFixture<T>} fixture - fixture component T
 * @param {number} userId - user ID
 * @param {Array<IUser>} arrUsers - array with user info
 * @return {void}
 */
function setMockNgRedux<T>(fixture : ComponentFixture<T>, userId : number, arrUsers : Array<IUser>) : void {
	const selActiveUserIdStub = MockNgRedux.getSelectorStub(['state', 'activeUserId']);
	selActiveUserIdStub.next(userId);
	selActiveUserIdStub.complete();
	const selUsersStub = MockNgRedux.getSelectorStub(['state', 'users']);
	selUsersStub.next(arrUsers);
	selUsersStub.complete();
}

describe('UsersListComponent', () => {
  let component : UsersListComponent;
  let fixture : ComponentFixture<UsersListComponent>;
	/* Services */
	let router : Router;
	/* Spys */
	let spyNavigate : jasmine.Spy;

  beforeEach(async(() => {
		MockNgRedux.reset();
    TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [ UsersListComponent ],
			providers: [
	      { provide: Router, useClass: RouterStub },
				{ provide: NgRedux, useClass: NgReduxStub },
				{ provide: AppActions, useClass: AppActions },
				{ provide: LoggerService, useClass: LoggerServiceStub }
	    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;

		router = fixture.debugElement.injector.get(Router);
		spyNavigate = spyOn(router, 'navigate');
  });

	it('should show empty table before OnInit', async(() => {
		setMockNgRedux(fixture, 2, users);

		const deUserRecors : Array<DebugElement> = fixture.debugElement.queryAll(By.css('table tbody tr'));
		expect(deUserRecors.length).toBe(0, 'Number of row (line) table must to equal 0');
	}));

	it('should show empty table with empty user data (null)', async(() => {
		setMockNgRedux(fixture, null, null);
		fixture.detectChanges();

		const deUserRecors : Array<DebugElement> = fixture.debugElement.queryAll(By.css('table tbody tr'));
		expect(deUserRecors.length).toBe(0, 'Number of row (line) table must to equal 0');
	}));

	it('should show 2 table line', async(() => {
		setMockNgRedux(fixture, null, users);
		fixture.detectChanges();

		const deUserRecors : Array<DebugElement> = fixture.debugElement.queryAll(By.css('table tbody tr'));
		expect(deUserRecors.length).toBe(2, 'Number of row (line) table must to equal 2');
		deUserRecors.map((deRecord : DebugElement, index : number) => {
			const elUser : HTMLElement = deRecord.nativeElement;
			expect(elUser.hasAttribute('data-id')).toBeTruthy('Every element must have data-id');
			expect(+elUser.getAttribute('data-id')).toBe(users[index].id, 'Every element must satisfy one user record');
		});
	}));

	it('should show correct data about users', async(() => {
		setMockNgRedux(fixture, null, users);
		fixture.detectChanges();

		const deUserRecors : Array<DebugElement> = fixture.debugElement.queryAll(By.css('table tbody tr'));
		const deUserFirst : DebugElement = deUserRecors[0];
		const deUserInfo : Array<DebugElement> = deUserFirst.queryAll(By.css('td'));
		const firstUser : IUser = users[0];
		expect(deUserInfo[0].nativeElement.textContent).toBe(firstUser.id.toString(), 'IDs must match');
		expect(deUserInfo[1].nativeElement.textContent).toBe(firstUser.username, 'Usernames must match');
		expect(deUserInfo[2].nativeElement.textContent).toBe(firstUser.name, 'Names must match');
		expect(deUserInfo[3].nativeElement.textContent).toBe(firstUser.company.name, 'Company names must match');
		expect(deUserInfo[4].nativeElement.textContent).toBe(firstUser.email, 'E-mails must match');
	}));

	it('should show 1 active line from all lines', async(() => {
		setMockNgRedux(fixture, 2, users);
		fixture.detectChanges();

		const deUserRecors : Array<DebugElement> = fixture.debugElement.queryAll(By.css('table tbody tr.active'));
		expect(deUserRecors.length).toBe(1, 'Number of row (line) table with active user must to equal 1');
		const deUser : DebugElement = deUserRecors[0];
		const elUser : HTMLElement = deUser.nativeElement;
		expect(+elUser.getAttribute('data-id')).toBe(2, 'Active element must have id 2');
	}));

	it('should not call Router.navigate if event obj doesn\'t transmitted', async(() => {
		setMockNgRedux(fixture, 2, users);
		fixture.detectChanges();

		const deUserTable : DebugElement = fixture.debugElement.query(By.css('table tbody'));
		const deUserRecord : DebugElement = deUserTable.query(By.css('tr'));
		deUserTable.triggerEventHandler('click', null);

		expect(spyNavigate.calls.any()).toBeFalsy('Method navigate must not called');
	}));

	it('should call Router.navigate with correct args when record is clicked', async(() => {
		setMockNgRedux(fixture, 2, users);
		fixture.detectChanges();

		const deUserTable : DebugElement = fixture.debugElement.query(By.css('table tbody'));
		const deUserRecord : DebugElement = deUserTable.query(By.css('tr'));
		const msEvent = {
			target : deUserRecord.nativeElement
		};
		deUserTable.triggerEventHandler('click', msEvent);

		let navigateArg : Array<any> = spyNavigate.calls.first().args[0];
		navigateArg = navigateArg.map((arg : any) => arg.toString());
		expect(spyNavigate.calls.any()).toBeTruthy('Method navigate must called');
		expect(navigateArg[0]).toBe('users', 'First args must match "users" route');
		expect(navigateArg[1]).toBe('1', 'Second args must match "1" ID');
	}));
});
