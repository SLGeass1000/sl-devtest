import { AppActions } from './app.actions';

/* Interfaces */
import { IAction } from '../shared/interfaces/action.interface';
import { IRUsers } from '../shared/interfaces/users.interface';

/* Mocks */
import { users } from '../../testing/users.mock';

describe('AppActions', () => {
	let appActions : AppActions;
	const className : string = 'AppActions';

	beforeEach(() => {
    appActions = new AppActions();
  });

	it('"openModal" should be correct', () => {
		const actionName : string = 'OPEN_MODAL';

		let action : IAction;
		let modalName : string;

		modalName = 'modal1';
		action = appActions.openModal(modalName);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.name).toBe(modalName, `Name must be equal "${modalName}"`);
		expect(action.payload.state).toBeTruthy(`State must be equal "true"`);

		modalName = 'modal2';
		action = appActions.openModal(modalName, false);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.name).toBe(modalName, `Name must be equal "${modalName}"`);
		expect(action.payload.state).toBeFalsy(`State must be equal "false"`);
	});

	it('"closeActiveModal" should be correct', () => {
		const actionName : string = 'CLOSE_ACTIVE_MODAL';

		let action : IAction;

		action = appActions.closeActiveModal();
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload).toBeUndefined(`Payload must be undefined`);

		action = appActions.closeActiveModal();
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload).toBeUndefined(`Payload must be undefined`);
	});

	it('"setUsers" should be correct', () => {
		const actionName : string = 'SET_USERS';

		let action : IAction;
		let dataUsers : IRUsers;

		dataUsers = [users[0]];
		action = appActions.setUsers(dataUsers);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.users).toBe(dataUsers, `Payload must be equal user with id 1`);

		dataUsers = [users[1]];
		action = appActions.setUsers(dataUsers);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.users).toBe(dataUsers, `Payload must be equal user with id 2`);
	});

	it('"setActiveUserId" should be correct', () => {
		const actionName : string = 'SET_ACTIVE_USER_ID';

		let action : IAction;
		let dataUserId : number;

		dataUserId = 1;
		action = appActions.setActiveUserId(dataUserId);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.id).toBe(dataUserId, `Payload must be equal user id 1`);

		dataUserId = 2;
		action = appActions.setActiveUserId(dataUserId);
		expect(action.type).toBe(`${className}:${actionName}`, `Type must be equal "${className}:${actionName}"`);
		expect(action.payload.id).toBe(dataUserId, `Payload must be equal user id 2`);
	});
});
