import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { By } from '@angular/platform-browser';

import { AppReducer, INITIAL_STATE, IApp } from './reducers/app.store';

/* Interfaces */
//import { IAction } from '../../shared/interfaces/action.interface';

/* Components */
import { AppComponent } from './app.component';

/* Services */
// ---

/* Stubs */
import { RouterOutletStubComponent } from '../testing/router.stub';
import { NgRedux, NgReduxStub } from '../testing/redux.stub';
import { ElementRef, ElementRefStub, Renderer2, Renderer2Stub } from '../testing/core.stub';
import { LoggerService, LoggerServiceStub } from '../testing/logger.stub';

/* Mocks */
// ---


/**
 * setMockNgRedux - perform setup the redux store for AppComponent
 *
 * @param {ComponentFixture<T>} fixture - fixture component T
 * @param {boolean} openModalOverlay - modal overlay is opened?
 * @param {boolean} openModal - modal is opened?
 * @return {void}
 */
function setMockNgRedux<T>(fixture : ComponentFixture<T>, openModalOverlay : boolean, openModal : boolean) : void {
	const selActiveUserIdStub = MockNgRedux.getSelectorStub(['modal', 'openModalOverlay']);
	selActiveUserIdStub.next(openModalOverlay);
	selActiveUserIdStub.complete();
	const selUsersStub = MockNgRedux.getSelectorStub(['modal', 'open']);
	selUsersStub.next(openModal);
	selUsersStub.complete();
}

describe('AppComponent', () => {
	let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
	/* Services */
	let ngRedux : NgReduxStub;
	let renderer2 : Renderer2;
	/* Spys */
	let spyConfigureStore : jasmine.Spy;
	let spySetStyle : jasmine.Spy;

  beforeEach(async(() => {
		MockNgRedux.reset();
		ngRedux = new NgReduxStub();
		spyConfigureStore = spyOn(ngRedux, 'configureStore');

    TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [ AppComponent, RouterOutletStubComponent ],
			providers: [
				{ provide: ElementRef, useClass: ElementRefStub },
				{ provide: Renderer2, useClass: Renderer2Stub },
				{ provide: NgRedux, useValue: ngRedux },
				{ provide: LoggerService, useClass: LoggerServiceStub }
	    ]
    }).compileComponents();
  }));

	beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

		renderer2 = fixture.debugElement.injector.get(Renderer2);
		spySetStyle = spyOn(renderer2, 'setStyle');
  });

	it('should call "configureStore" and one set correct args', async(() => {
		setMockNgRedux(fixture, false, false);
	  fixture.detectChanges();

	  expect(spyConfigureStore.calls.any()).toBeTruthy('');
		const configureStoreArgs : Array<any> = spyConfigureStore.calls.first().args;
		expect(configureStoreArgs[0]).toBe(AppReducer, 'Main reducer must be correct');
		expect(configureStoreArgs[1]).toBe(INITIAL_STATE, 'Initial state must be correct');
		expect(configureStoreArgs[2]).toBeNull();
	}));

	it('should hide the native scroll and one should show new modal scroll', async(() => {
		setMockNgRedux(fixture, null, true);
	  fixture.detectChanges();

	  expect(spySetStyle.calls.any()).toBeTruthy('');
		const elRef : ElementRef = fixture.debugElement.injector.get(ElementRef);
		const setStyleArgs : Array<any> = spySetStyle.calls.first().args;
		expect(setStyleArgs[0]).toBe(elRef.nativeElement.ownerDocument.body);
		expect(setStyleArgs[1]).toBe('overflow-y');
		expect(setStyleArgs[2]).toBe('hidden');
		expect(component.scrollHidden).toBeTruthy('');

		const deWindow : DebugElement = fixture.debugElement.query(By.css('.overflow-hidden'));
		expect(deWindow).not.toBeNull('');
	}));

	it('should show the native scroll and one should hide new modal scroll', async(() => {
		setMockNgRedux(fixture, null, false);
	  fixture.detectChanges();

	  expect(spySetStyle.calls.any()).toBeTruthy('');
		const elRef : ElementRef = fixture.debugElement.injector.get(ElementRef);
		const setStyleArgs : Array<any> = spySetStyle.calls.first().args;
		expect(setStyleArgs[0]).toBe(elRef.nativeElement.ownerDocument.body);
		expect(setStyleArgs[1]).toBe('overflow-y');
		expect(setStyleArgs[2]).toBe('scroll');
		expect(component.scrollHidden).toBeFalsy('');

		const deWindow : DebugElement = fixture.debugElement.query(By.css('.overflow-hidden'));
		expect(deWindow).toBeNull('');
	}));

	it('should show modal overlay', async(() => {
		setMockNgRedux(fixture, true, null);
		fixture.detectChanges();

		const deOverlay : DebugElement = fixture.debugElement.query(By.css('.visible'));
		expect(deOverlay).not.toBeNull('The modal overlay must be show');
	}));

	it('should hide modal overlay', async(() => {
		setMockNgRedux(fixture, false, null);
		fixture.detectChanges();

		const deOverlay : DebugElement = fixture.debugElement.query(By.css('.visible'));
		expect(deOverlay).toBeNull('The modal overlay must not be show');
	}));
});
