import { Reducer } from 'redux';
import { IAction } from '../shared/interfaces/action.interface';
import { AppActions } from '../actions/app.actions';

export interface IModal {
	open : boolean;
	openPanelOverlay : boolean;
	openModalOverlay : boolean;
	active : string;
	/* Modals */
}

export const INITIAL_STATE : IModal = {
	open : false,
	openPanelOverlay : false,
	openModalOverlay : false,
	active : null,
	/* Modals */
};

export const ModalReducer : Reducer<IModal> = (state = INITIAL_STATE, action : IAction) : IModal => {
	switch (action.type) {
		case AppActions.OPEN_MODAL : {
			const modal = Object.assign({}, state, {
				openModalOverlay : action.payload.state,
				openPanelOverlay : false
			});
			if (modal.active !== action.payload.name) {
				modal.active = action.payload.name;
				modal.open = true;
			}	else {
				modal.active = null;
				modal.open = false;
				modal.openModalOverlay = false;
			}
			return modal;
		}
		case AppActions.CLOSE_ACTIVE_MODAL : {
			const modal = Object.assign({}, state, {
				openModalOverlay : false,
				openPanelOverlay : false
			});
			if (modal.active !== null) {
				modal.active = null;
				modal.open = false;
			}
			return modal;
		}
	}
	return state;
};
