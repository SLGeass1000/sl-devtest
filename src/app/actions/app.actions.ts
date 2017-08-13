import { Injectable } from '@angular/core';

/* Interfaces */
import { IAction } from '../shared/interfaces/action.interface';
import { IRUsers } from '../shared/interfaces/users.interface';

@Injectable()
export class AppActions {
	static readonly CLASS_NAME = 'AppActions:';
	static readonly OPEN_MODAL = AppActions.CLASS_NAME + 'OPEN_MODAL';
	static readonly OPEN_PANEL = AppActions.CLASS_NAME + 'OPEN_PANEL';
	static readonly CLOSE_ACTIVE_MODAL = AppActions.CLASS_NAME + 'CLOSE_ACTIVE_MODAL';

	static readonly SET_CLIENT_COORD = AppActions.CLASS_NAME + 'SET_CLIENT_COORD';
	static readonly SET_USERS = AppActions.CLASS_NAME + 'SET_USERS';
	static readonly SET_ACTIVE_USER_ID = AppActions.CLASS_NAME + 'SET_ACTIVE_USER_ID';

	/* Modal */
	openModal (name : string, state : boolean = true) : IAction {
    return {
      type : AppActions.OPEN_MODAL,
			payload : {
				name : name,
				state : state
			}
    };
  }
	closeActiveModal () : IAction {
    return {
      type : AppActions.CLOSE_ACTIVE_MODAL
    };
  }

	/* Users Module */
	setUsers (users : IRUsers) : IAction {
    return {
      type : AppActions.SET_USERS,
			payload : {
				users : users
			}
    };
  }
	setActiveUserId (id : number) : IAction {
    return {
      type : AppActions.SET_ACTIVE_USER_ID,
			payload : {
				id : id
			}
    };
  }
}
