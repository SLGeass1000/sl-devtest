import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { By } from '@angular/platform-browser';

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
	let ngRedux : NgRedux<any>;
	let renderer2 : Renderer2;
	/* Spys */
	let spyConfigureStore : jasmine.Spy;
	let spySetStyle : jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports : [ NgReduxTestingModule ],
      declarations: [ AppComponent, RouterOutletStubComponent ],
			providers: [
				{ provide: ElementRef, useClass: ElementRefStub },
				{ provide: Renderer2, useClass: Renderer2Stub },
				{ provide: NgRedux, useClass: NgReduxStub },
				{ provide: LoggerService, useClass: LoggerServiceStub }
	    ]
    }).compileComponents();
  }));

	beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

		ngRedux = fixture.debugElement.injector.get(NgRedux);
		spyConfigureStore = spyOn(ngRedux, 'configureStore');

		renderer2 = fixture.debugElement.injector.get(Renderer2);
		spySetStyle = spyOn(renderer2, 'setStyle');
  });

	it('should open modal with his scroll and hide the native scroll', async(() => {
		setMockNgRedux(fixture, true, true);
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
});
