import { Routes, RouterModule }  from '@angular/router';

import { News } from './news.component';
import { Publish } from './publish/publish.component';
import { View } from './view/view.component';
import { Edit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: News,
    children: [
      { path: 'publish', component: Publish },
      { path: 'view', component: View },
      { path: 'edit', redirectTo: '' },
      { path: 'edit/:id', component: Edit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
