import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ProcessElement} from '../../model/process-element';
import {ProcessService} from '../../../service/process-service';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../service/login-service';
import {Location} from '@angular/common';
import {DocumentService} from '../../../service/document.service';
import {Document} from '../../model/document';
import {LegendService} from '../../../service/legend-service';
import {select, State, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getProcess} from '../../store/selectors/process.selector';
import {isLoggedIn} from '../../store/selectors/login.selector';



@Component({
  selector: 'app-detail-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  @Input() newProcess: ProcessElement;
  detailProcessList: any = [];
  level = 1;
  uuid: number;
  parent: number;
  showCreateElement: boolean[] = [false, false, false, false, false, false, false, false];
  hideCreateElement: boolean[] = [false, false, false, false, false, false, false, false];
  showAddButton: boolean[] = [true, true, true, true, true, true, true, true];
  isAdmin = false;
  matchDocs: Document[] = [];
  matchNames: string[] = [];
  departments: any = [];
  loginStatus$: Observable<any>;
  processList$: Observable<ProcessElement[]>;


  constructor(private location: Location,
              private store: Store<{login: boolean}>,
              private store1: Store<{process: ProcessElement[]}>,
              private processStore: Store<any>,
              private processService: ProcessService,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private documentService: DocumentService,
              private legend: LegendService) {
    this.loginStatus$ = store.select(isLoggedIn);
    this.processList$ = store1.select(getProcess);
    this.store.dispatch({ type: '[Process] loadAllProcess' });
  }


  ngOnInit() {
    this.loginStatus$.subscribe((loginStatus) => {
     if (loginStatus) {
       this.isAdmin = true;
     } else {
       this.hideAllAddProcessComponent();
       this.isAdmin = false;
     }
    });
    this.getDepartments();
  }

  showAddProcessComponent(id: number) {
    this.showCreateElement[id] = true;
    this.hideCreateElement[id] = true;
    this.showAddButton[id] = false;
  }

  hideAddProcessComponent(id: number) {
    this.showCreateElement[id] = false;
    this.showAddButton[id] = true;
    this.hideCreateElement[id] = false;
  }

  hideAllAddProcessComponent() {
    this.showCreateElement.fill(false);
    this.hideCreateElement.fill(false);
    this.showAddButton.fill(true);
  }

  getAllProcess(parent?: number, uuid?: number, increase?: number) {
    this.uuid = uuid;
    if (increase) {
      this.level = this.level + increase;
      localStorage.setItem('parent', uuid?.toString());
      console.log(uuid);
    }
    if (parent === undefined) {
      uuid = this.parent;
    }
  }


/*  drop1(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.firstProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.firstProcessRow.length; x++) {
        this.firstProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop2(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.secondProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.secondProcessRow.length; x++) {
        this.secondProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop3(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.thirdProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.thirdProcessRow.length; x++) {
        this.thirdProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop4(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.fourthProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.fourthProcessRow.length; x++) {
        this.fourthProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop5(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.fifthProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.fifthProcessRow.length; x++) {
        this.fifthProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop6(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.sixthProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.sixthProcessRow.length; x++) {
        this.sixthProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop7(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.seventhProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.seventhProcessRow.length; x++) {
        this.seventhProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }

  drop8(event: CdkDragDrop<string[]>) {
    if (this.isAdmin) {
      moveItemInArray(this.eighthProcessRow, event.previousIndex, event.currentIndex);
      for (let x = 0; x < this.eighthProcessRow.length; x++) {
        this.eighthProcessRow[x].position = x;
      }
      this.udpateProcess();
    }
  }*/


  addNewProcess(newProcess: ProcessElement) {
    this.processService.addProcessElement(newProcess)
      .subscribe(process => {
       // this.distributeProcessElements(process);
      });
    this.detailProcessList.push(newProcess);
  }

  udpateProcess(processElement: ProcessElement) {
    this.store.dispatch({ type: '[Process] updateProcess', payload: processElement });
  }

  deleteProcessElement(id: number) {
    this.processService.deleteProcess(id)
      .subscribe(process => {
        //this.distributeProcessElements(process);
      });
  }

  getDepartments() {
    this.legend.getDepartments()
      .subscribe(data => {
        this.departments = data;
      });
  }



  showDocuments(data) {
/*    this.documentService.getDocumentsByParent(this.parentId)
      .pipe(
        map(docs => docs.filter(doc => doc.name = this.parentId)))
      .subscribe((i) => {
        this.matchDocs = i;
        this.matchDocs.forEach(info => this.matchNames.push(info.coreElement));
        if (this.matchNames.includes(data.name)) {
          data.hasDocument = true;
        }
      });*/
  }



  navigateBack() {
    const parent = localStorage.getItem('parent');
    // tslint:disable-next-line:radix
    const convertedNumber = parseInt(parent);
    console.log(convertedNumber);
    this.getAllProcess( convertedNumber);
  }
}

