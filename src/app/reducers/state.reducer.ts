import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { AppActions } from '../actions/app.actions';

import { IRUsers } from '../shared/interfaces/users.interface';

export interface IState {
	users : IRUsers;
	activeUserId : number;
}

export const INITIAL_STATE : IState = {
	users : null,
	activeUserId : null
};

export const StateReducer : Reducer<IState> = (state = INITIAL_STATE, action : IAction) : IState => {
	switch (action.type) {
		case AppActions.SET_USERS : {
			return Object.assign({}, state, {
				users : action.payload.users
			});
		}
		case AppActions.SET_ACTIVE_USER_ID : {
			return Object.assign({}, state, {
				activeUserId : action.payload.id
			});
		}
	}
	return state;
};
