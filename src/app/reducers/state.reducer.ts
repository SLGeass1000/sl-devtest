import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { AppActions } from '../actions/app.actions';


export interface IState {
}

export const INITIAL_STATE : IState = {
};

export const StateReducer : Reducer<IState> = (state = INITIAL_STATE, action : IAction) : IState => {
	switch (action.type) {
	}
	return state;
};
