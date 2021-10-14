import {Action} from '@ngrx/store';

export enum ActionTypes {
  loadAllProcess = '[Process] loadAllProcess',
  processLoaded = '[Process] processLoaded',
  updateProcess = '[Process] updateProcess'
}

export class LoadAllProcess implements Action {
  readonly type = ActionTypes.loadAllProcess;
  constructor(public payload) {
  }
}

export class ProcessLoaded implements Action {
  readonly type = ActionTypes.processLoaded;
  constructor(public payload) {
  }
}

export class UpdateProcess implements Action {
  readonly type = ActionTypes.updateProcess;
  constructor(public payload) {
  }

}

export type ProcessActions = LoadAllProcess |ProcessLoaded | UpdateProcess;
