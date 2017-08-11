import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { UsersListComponent } from './users-list.component';
import { Router, RouterStub } from '../../../testing/router.stub';
import { NgRedux, NgReduxStub } from '../../../testing/redux.stub';
import { LoggerService, LoggerServiceStub } from '../../../testing/logger.stub';

import { AppActions } from '../../actions/app.actions';
class AppActionsStub {
}

describe('UsersListComponent', () => {
  let component : UsersListComponent;
  let fixture : ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
			providers: [
      { provide: Router, useClass: RouterStub },
			{ provide: NgRedux, useClass: NgReduxTestingModule },
			{ provide: AppActions, useClass: AppActionsStub },
			{ provide: LoggerService, useClass: LoggerServiceStub }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
