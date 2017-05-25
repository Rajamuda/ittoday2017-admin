import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe } from './view/data-filter.pipe';
import { TruncatePipe } from './view/truncate';

import { News } from './news.component';
import { routing } from './news.routing';
import { Publish } from './publish/publish.component';
import { View } from './view/view.component';
import { Edit } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    routing,
    DataTableModule
  ],
  declarations: [
    News,
    Publish,
    View,
    Edit,
    DataFilterPipe,
    TruncatePipe
  ]
})
export class NewsModule {}