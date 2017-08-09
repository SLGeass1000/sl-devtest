import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { AppActions } from '../actions/app.actions';

import { IRUsers } from '../shared/interfaces/users.interface';
import { IClientCoord } from '../shared/interfaces/app.interface';

export interface IState {
	users : IRUsers;
	activeUserId : number;
	clientCoord : IClientCoord;
}

export const INITIAL_STATE : IState = {
	users : null,
	activeUserId : null,
	clientCoord : null
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
		case AppActions.SET_CLIENT_COORD : {
			const newCoordX : number = action.payload.coord ? action.payload.coord.x : 0;
			const oldCoordX : number = state.clientCoord ? state.clientCoord.x : 0;
			if (Math.abs(newCoordX - oldCoordX) < 100) {
				return state;
			}
			return Object.assign({}, state, {
				clientCoord : action.payload.coord
			});
		}
	}
	return state;
};
