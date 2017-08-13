import { DebugElement } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/* Interfaces */
import { IUser } from '../shared/interfaces/users.interface';
import { IAction } from '../shared/interfaces/action.interface';

/* Components */
import { UsersComponent } from './users.component';

/* Services */
import { AppActions } from '../actions/app.actions';

/* Stubs */
import { RouterOutlet, RouterOutletStubComponent } from '../../testing/router.stub';
import { NgRedux, NgReduxStub } from '../../testing/redux.stub';
import { LoggerService, LoggerServiceStub } from '../../testing/logger.stub';
import { UsersService, UsersServiceStub, UsersListComponent, UsersListStubComponent } from '../../testing/users.stub';

/* Mocks */
import { users } from '../../testing/users.mock';

describe('UsersComponent', () => {
  let component : UsersComponent;
  let fixture : ComponentFixture<UsersComponent>;
	/* Services */
	let ngRedux : NgRedux<any>;
	/* Spys */
	let spyDispatch : jasmine.Spy;

  beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [
				UsersComponent,
				RouterOutletStubComponent,
				UsersListStubComponent
			],
			providers: [
			{ provide: NgRedux, useClass: NgReduxStub },
			{ provide: AppActions, useClass: AppActions },
			{ provide: LoggerService, useClass: LoggerServiceStub },
			{ provide: UsersService, useClass: UsersServiceStub }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

		ngRedux = fixture.debugElement.injector.get(NgRedux);
		spyDispatch = spyOn(ngRedux, 'dispatch');
  });

	it('should dispatch users data into redux store', async(() => {
	  fixture.detectChanges();

	  expect(spyDispatch.calls.any()).toBeTruthy('ngRedux.dispatch must be called');
		const argAction : IAction = spyDispatch.calls.first().args[0];
		expect(argAction.type).toBe('AppActions:SET_USERS');
		expect(argAction.payload.users).toBe(users);
	}));

	it('should not dispatch users data into redux store', async(() => {
		const usersService : UsersService = fixture.debugElement.injector.get(UsersService);
		const spyGetUserList = spyOn(usersService, 'getUserList')
			.and.returnValues(Observable.throw('Error 1!'));
	  fixture.detectChanges();

	  expect(spyDispatch.calls.any()).toBeFalsy('ngRedux.dispatch must not be called');
	}));

	it('should have "sl-users-list" component', () => {
		const deUserList : DebugElement = fixture.debugElement.query(By.css('sl-users-list'));
		expect(deUserList).not.toBeNull('UserList component must be in the template');
	});

	it('should have "router-outlet" component', () => {
		const deRouterOutlet : DebugElement = fixture.debugElement.query(By.css('router-outlet'));
		expect(deRouterOutlet).not.toBeNull('RouterOutlet component must be in the template');
	});
});
