import { Injectable } from '@angular/core';
import { IAction } from '../shared/interfaces/action.interface';

@Injectable()
export class AppActions {
	static readonly CLASS_NAME = 'AppActions:';
	static readonly OPEN_MODAL = AppActions.CLASS_NAME + 'OPEN_MODAL';
	static readonly OPEN_PANEL = AppActions.CLASS_NAME + 'OPEN_PANEL';
	static readonly CLOSE_ACTIVE_MODAL = AppActions.CLASS_NAME + 'CLOSE_ACTIVE_MODAL';

	openModal (name : string, state : boolean = true) : IAction {
    return {
      type : AppActions.OPEN_MODAL,
			payload : {
				name : name,
				state : state
			}
    };
  }
	openPanel (name : string, state : boolean = true) : IAction {
    return {
      type : AppActions.OPEN_PANEL,
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
}
