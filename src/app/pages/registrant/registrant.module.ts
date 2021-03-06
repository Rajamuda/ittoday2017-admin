import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe } from './data-filter.pipe';
import { TruncatePipe } from './truncate';

import { routing } from './registrant.routing';
import { Registrant } from './registrant.component';
import { Participant } from './participant/participant.component';
import { AppsToday } from './appstoday/appstoday.component';
import { HackToday } from './hacktoday/hacktoday.component';
import { Seminar } from './seminar/seminar.component';
import { Single } from './viewsingle/single.component';
import { Team } from './viewteam/team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    routing,
    NgbDropdownModule,
    NgbModalModule,
    DataTableModule
  ],
  declarations: [
    Registrant,
    Participant,
    AppsToday,
    HackToday,
    Seminar,
    Single,
    Team,
    DataFilterPipe,
    TruncatePipe
  ]
})
export class RegistrantModule {}