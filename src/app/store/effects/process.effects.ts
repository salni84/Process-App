import {Injectable} from '@angular/core';

import {ProcessService} from '../../../service/process-service';
import {map, mergeMap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoadAllProcess, ProcessLoaded} from '../actions/process.actions';

@Injectable()
export class ProcessEffects {


  loadAllProcess$ = createEffect(() => this.actions$.pipe(
    ofType('[Process] loadAllProcess'),
    mergeMap(() => this.processService.getFullProcessLoad()
        .pipe(
          map(process => new ProcessLoaded(process))
        ))
    )
  );

  updateProcess$ = createEffect(() => this.actions$.pipe(
    ofType('[Process] updateProcess'),
    mergeMap((updatedProcess) => this.processService.updateProcessProperties(updatedProcess)
      .pipe(
        map(process => new LoadAllProcess(process))
      ))
  ));

  constructor(private actions$: Actions, private processService: ProcessService) {}
}
