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

	/*
	-- To Develop
	it('should ', async(() => {
	  fixture.detectChanges();

	  expect(spyConfigureStore.calls.any()).toBeTruthy('');
	}));
	*/
});
