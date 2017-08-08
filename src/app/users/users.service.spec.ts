import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { UsersService } from './users.service';
import { LoggerService } from '../core/logger.service';
import { HttpService } from '../core/http.service';

import { IRUsers } from '../shared/interfaces/users.interface';
import { users } from './users.mock';

function makeUsersData () : IRUsers {
	return users;
}

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
			imports : [ HttpModule ],
      providers : [
				UsersService,
				LoggerService,
				HttpService,
				{ provide : XHRBackend, useClass : MockBackend }
			]
    });
  });

	it('can instantiate LoggerService when inject service',
    inject([LoggerService], (service : LoggerService) => {
      expect(service instanceof LoggerService).toBe(true);
  }));

	it('can instantiate HttpService when inject service',
    inject([HttpService], (service : HttpService) => {
      expect(service instanceof HttpService).toBe(true);
  }));

	it('can instantiate UsersService when inject service',
    inject([UsersService], (service : UsersService) => {
      expect(service instanceof UsersService).toBe(true);
  }));

	it('can instantiate service with "new"', inject([ Http ], (http : Http) => {
    expect(http).not.toBeNull('http should be provided');
    const loggerService : LoggerService = new LoggerService();
		const httpService : HttpService = new HttpService(loggerService);
		const usersService : UsersService = new UsersService(http, loggerService, httpService);
    expect(loggerService instanceof LoggerService).toBe(true, 'new loggerService should be ok');
		expect(httpService instanceof HttpService).toBe(true, 'new httpService should be ok');
		expect(usersService instanceof UsersService).toBe(true, 'new UsersService should be ok');
  }));

	it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend : MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

	describe('when check verb method', () => {
		let backend : MockBackend;
		let loggerService : LoggerService;
		let httpService : HttpService;
		let usersService : UsersService;

		beforeEach(inject([Http, XHRBackend], (http : Http, be : MockBackend) => {
			backend = be;
			loggerService = new LoggerService();
			httpService = new HttpService(loggerService);
			usersService = new UsersService(http, loggerService, httpService);
		}));

		it('getUserList: should have expected fake user list', async(inject([], () => {
			const fakeData : IRUsers = makeUsersData();
			const resp = new Response(new ResponseOptions({ status : 200, body : fakeData }));
			backend.connections.subscribe((c : MockConnection) => c.mockRespond(resp));

			usersService.getUserList().subscribe(
				(data : IRUsers) => {
					expect(data.length).toBe(fakeData.length, 'should have expected no. of texture categories');
				}
			);
		})));

		it('getUserList: should be 404 returning no user list', async(inject([], () => {
			const resp = new Response(new ResponseOptions({ status : 404, body : { error : 'No content in database' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			usersService.getUserList().subscribe(
				(data : IRUsers) => { },
				(error : string) => {
					expect(error).toBe('No content in database', 'should have no texture categories');
				}
			);
		})));
	});
});
